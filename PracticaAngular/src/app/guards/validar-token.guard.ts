import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { LoginService } from '../services/login.service';
import { map, catchError } from 'rxjs/operators'; // Agrega la importación de catchError
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs'; // Agrega la importación de of

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token') || '';
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<Usuario[]>(environment.URL_API + '/usuario/info', { headers }).pipe(
        map((usuario) => {
          // El token es válido
          return true;
        }),
        catchError((error) => {
          if (error.status === 401) {
            // El token es inválido o ha expirado
            console.log('Token inválido o ha expirado');
            this.router.navigate(['/registro']);
          } else {
            // Ocurrió un error diferente
            this.router.navigate(['/error']);
          }
          return of(false);
        })
      );
    } else {
      return of(false);
    }
  } // Agrega la llave que cierra la función
}
