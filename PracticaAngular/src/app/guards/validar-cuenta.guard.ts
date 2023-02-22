import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { LoginService } from '../services/login.service';
import { map } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidarCuentaGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private router: Router

  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Usuario[]>(environment.URL_API + '/usuario/info', { headers }).pipe(
      map((usuario) => {
        if (usuario[0].activo == true) {
          return true;
        } else {
          this.router.navigate(['/cuentaDesactivada']);
          return false;
        }
      }), catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/sesionExpirada']);
        } else {
          this.router.navigate(['/error']);
        }
        return throwError(error.message);
      })
    );
  }

}
