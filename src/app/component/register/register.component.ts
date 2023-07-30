import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../shared/auth.service';
import { Component } from '@angular/core';
import { LogoutComponent } from 'src/app/dialog/logout/logout.component';
import { RegisteredComponent } from 'src/app/dialog/registered/registered.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
email:string = '';
password:string ='';

constructor( private auth:AuthService,private dialog:MatDialog){}
registor(){
  if(this.email=='')
  {
    alert('Enter email please');
    return;
  }
  if(this.password=='')
  {
    alert('Enter password please');
    return;
  }
  this.auth.registor(this.email,this.password);
  this.email ='';
  this.password='';


}



signInWithGoogle(){
  this.auth.googleSignIn();

}
}
