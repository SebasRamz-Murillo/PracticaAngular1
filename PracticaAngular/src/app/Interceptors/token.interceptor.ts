import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token: string = '';
  constructor(private loginService: LoginService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Recuperar el token del Local Storage
    this.token = localStorage.getItem('token') || '';
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      });
    }
    return next.handle(request);
  }

  getToken(): string {
    return this.token;
  }
}
