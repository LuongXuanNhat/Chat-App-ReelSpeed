import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './ApiService/api.service';

export class Verified implements CanActivate {
  constructor(private router: Router,private toastr: ToastrService, private service: ApiService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.service.isAuthenticated()) {
      return true;
    } else {
      this.toastr.warning('Bạn chưa đăng nhập')
      this.router.navigate(['/login']);
      return false;
    }
  }

}
