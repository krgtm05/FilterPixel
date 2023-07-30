import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, user } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { RegisteredComponent } from '../dialog/registered/registered.component';
import { Person } from '../appModels/person.model';
import { Subject, tap, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username: string = '';
  authstatus: boolean = false;
  person = new Subject<Person>();
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private dialog: MatDialog
  ) {
    // this.autoSignIn();
  }
  getUsername() {
    return this.username;
  }
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('UserInfo', JSON.stringify(user));
        this.router.navigate(['dashboard']);
        this.username = email;
        this.authstatus = true;

      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }
  registor(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        // alert('Registration Successful');
        this.dialog.open(RegisteredComponent, {
          width: '600px',
          height: '600px',
        });

        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }

    )

  }
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('UserInfo');
        this.router.navigate(['/login']);
        this.authstatus = false;
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(
      (res) => {
        localStorage.setItem('UserInfo', JSON.stringify(res.user));
        this.authstatus = true;
        this.router.navigate(['/dashboard']);
        const user = res.user;
        if (user) {
          this.username = user.displayName || 'Anonymous';
          console.log('Name:', user.displayName); // This will log the user's name
        }
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  getAuthStatus() {
    return this.authstatus;
  }
  autoSignIn() {
    const userdata = localStorage.getItem('UserInfo') || 'Anonymous';
    console.log(JSON.parse(userdata));
  }

  private authenticatedPerson(email: string, userId: string,token: string,expiresIn: number){
    const expirationTime = new Date(new Date().getTime() + expiresIn*1000);
    const person = new Person(email,userId,token,expirationTime)
    console.log('PersonData',person);

    this.person.next(person);
  }
}
