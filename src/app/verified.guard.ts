import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './ApiService/api.service';
import { AuthenComponent } from './authen/authen.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Verified implements CanActivate {
  constructor(private router: Router,private toastr: ToastrService, private service: ApiService,
     private dialog: MatDialog, ) {

  }
  
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (await this.service.isAuthenticated()) {
      return true;
    } else {
      
      this.toastr.info('Bạn chưa đăng nhập','Thông báo')
      this.dialog.open(AuthenComponent, {
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '600ms',
        width: '30%',
        height: '63%',
        minWidth: '300px',
        minHeight: '380px'
      });
      return false;
    }
  }

}
