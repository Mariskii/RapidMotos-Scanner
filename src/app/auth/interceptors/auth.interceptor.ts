import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, of } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let token = localStorage.getItem('accessToken');

  if(token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError(err => {
      localStorage.removeItem('accessToken');
      return of(err);
    })
  );
};
