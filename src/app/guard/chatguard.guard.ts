import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../ApiService/api.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

export const chatGuard: CanActivateFn = (route, state) => {
  const service = inject(ApiService);
  const toastr = inject(ToastrService);
  const router = inject(Router);
  if(service.GetGroupId())
    return true;

  toastr.info("Bạn chưa có nhóm !");
  router.navigate(['/searchroom']);
  return false;
};
