import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiService } from '../../ApiService/api.service';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(ApiService);

  const authReq = req.clone({
    setHeaders: {
      authorization: 'Bearer ' + token.GetToken(),
    },
  })
  return next(authReq)
};