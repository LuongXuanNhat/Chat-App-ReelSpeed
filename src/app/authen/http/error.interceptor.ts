import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
    if ([404].includes (error.status)) {
      console.log('Not found');
    }
    console.error(error.message);
    return throwError(() => error);
    })
  );
};
