import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const api: string = localStorage.getItem(environment.api)
    let token: string;

    if(api == 'ltgo'){
      token = localStorage.getItem(environment.authTokenKey);
    } else {
      token = localStorage.getItem(environment.authTokenKeyCdi);
    }
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(request);
  }
}
