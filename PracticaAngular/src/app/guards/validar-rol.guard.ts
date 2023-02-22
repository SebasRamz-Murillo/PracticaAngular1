import { Token } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { LoginService } from '../services/login.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidarRolGuard implements CanActivate {
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
        if (usuario[0].rol_id == 1 || usuario[0].rol_id == 2 || usuario[0].rol_id == 3) {
          return true;
        } else {
          this.router.navigate(['/Error']);
          return false;
        }
      })
    );
  }
}
