import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs'; // Agrega la importación de of

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['/chef']);
      console.log('Token válido');
      return true;
    } else {
      console.log('Token inválido');

      return false;
    }
  }
}
