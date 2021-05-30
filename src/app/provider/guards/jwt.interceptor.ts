import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authToken =''
    if (localStorage.getItem('account')) {
      const user = JSON.parse(localStorage.getItem('account') as string);
      authToken = `Bearer ${user.accessToken}`
    }
    const authReq = request.clone({
      headers: request.headers.set('Authorization', authToken)
    })

    return next.handle(authReq);
   
  }
}
