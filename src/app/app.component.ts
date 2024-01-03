import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AuthenComponent } from "./authen/authen.component";
import { HomeComponent } from "./home/home.component";
import { ApiService } from './ApiService/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AnimationService } from './animation.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, ToastrModule, AuthenComponent, HomeComponent,
              MatTooltipModule
    ],
    providers: [
      
    ]
})
export class AppComponent {
  title = 'ReelSpeedChat';
  logged!: boolean;
  constructor(private service: ApiService, private dialog: MatDialog, private router: Router){
    this.logged = this.service.isAuthenticated();
  }

  GetLogged(): boolean{
    return this.logged;
  }

  Authen(){
    this.dialog.open(AuthenComponent, {
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '600ms',
      width: '30%',
      height: '53%',
      minWidth: '300px',
      minHeight: '300px'
    });
  }

  GetUsers(){
    this.router.navigate(['/users']);
  }
  Settings(){
    this.router.navigate(['/settings']);
  }
  GetHome(){
    this.router.navigate(['']);
  }
  Search(){
    this.router.navigate(['/searchroom']);
  }
  IntoRoom(){
    this.router.navigate(['/chat']);
  }
}
