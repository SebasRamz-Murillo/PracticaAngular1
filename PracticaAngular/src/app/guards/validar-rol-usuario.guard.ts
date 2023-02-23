import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ValidarRolUsuarioGuard implements CanActivate {
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
          if (usuario[0].rol_id == 1 ) {
            return true;
          } else {
            this.router.navigate(['/error']);
            return false;
          }
        }),
        catchError((error: HttpErrorResponse) => {
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
