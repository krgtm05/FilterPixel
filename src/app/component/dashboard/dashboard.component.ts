import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from 'src/app/dialog/logout/logout.component';
import { AuthService } from 'src/app/shared/auth.service';
import { PixelPhotoService } from 'src/app/shared/pixel-photo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  image: any = [];
  search!: string;
  perPage!: number;
  temp: boolean = false;
  user: string = '';

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private PexelService: PixelPhotoService,
    private dialog: MatDialog
  ) {
    this.PexelService.getData(this.search, this.perPage);
    this.user = this.auth.getUsername();
  }


  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(LogoutComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  select(x: number) {
    this.perPage = x;
  }
  logout() {
    this.auth.logout();
  }

  searchPhotos() {
    this.PexelService.getData(this.search, this.perPage).subscribe(
      (data) => {
        console.log(data);
        this.image = data.photos;
        this.temp = true;
      },
      (error) => {
        console.error();
      }
    );
  }
}
