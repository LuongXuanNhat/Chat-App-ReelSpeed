import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthenComponent } from "./authen/authen.component";
import { HomeComponent } from "./home/home.component";
import { ApiService } from './ApiService/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, ToastrModule, AuthenComponent, HomeComponent,
              MatTooltipModule, HttpClientModule
    ],
})
export class AppComponent {

  title = 'ReelSpeedChat';
  avatar: any;
  constructor(private service: ApiService, private dialog: MatDialog, private router: Router, private toastr: ToastrService){

  }

  GetLogged(){
    return this.service.isAuthenticated();
  }
  GetAvatar(){
    if(this.service.isAuthenticated())
      return this.service.GetAvatar();
    return 'assets/rabbit.png';
  }
  Authen(){
    this.dialog.open(AuthenComponent, {
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '600ms',
      width: '30%',
      height: '63%',
      minWidth: '300px',
      minHeight: '380px'
    });
  }

  Logout() {
    this.service.Logout();
    this.toastr.success("Đã đăng xuất");
    this.router.navigate(['/']);
  }

  GetUsers(){
    if(!this.service.isAuthenticated()){
      this.service.SetOldPath('/users');
    }
    this.router.navigate(['/users']);
  }
  Settings(){
    if(!this.service.isAuthenticated()){
      this.service.SetOldPath('/settings');
    }
    this.router.navigate(['/settings']);
  }
  GetHome(){
    this.router.navigate(['']);
  }
  Search(){
    this.router.navigate(['/searchroom']);
  }
  IntoRoom(){
    if(!this.service.isAuthenticated()){
      this.service.SetOldPath('/chat');
    }
    this.router.navigate(['/chat']);
  }
}
