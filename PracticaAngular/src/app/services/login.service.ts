import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  APIURL = environment.URL_API+"/usuario"
  private _refresh$ = new Subject<void>();
  private crearUsuario = this.APIURL+'/crear'
  private obtenerRutaSigned = this.APIURL+'/codigo'
  private logearUsuario = this.APIURL+'/login'
  private logoutUsuario = this.APIURL+'/logout'
  private infoUsuario = this.APIURL+'/info'
  private actualizarUsuario = this.APIURL+'/update'
  private verificacion = environment.URL_API+'/verify'
  private codigo = environment.URL_API+'/codigo'


  constructor(private http: HttpClient) { }
  get_refresh$() {
    return this._refresh$;
  }
  getInfoUsuario(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.infoUsuario).pipe(retry(3), catchError(this.handleError))
  }
  getRutaSigned(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.obtenerRutaSigned).pipe(retry(3), catchError(this.handleError))
  }
  registrarUsuario(usuario:Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.crearUsuario, usuario).pipe(catchError(this.handleError)).pipe(tap(() => {
      this._refresh$.next();
    }
    ));
  }
  enviarCodigo(usuario:any): Observable<any>{
    return this.http.post<any>(this.codigo, usuario).pipe(catchError(this.handleError)).pipe(tap(() => {
      this._refresh$.next();
    }
    ));
  }
  updateUsuario(usuario:Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.actualizarUsuario, usuario).pipe(catchError(this.handleError)).pipe(tap(() => {
      this._refresh$.next();
    }
    ));
  }
  login(usuario:Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.logearUsuario, usuario).pipe(catchError(this.handleError)).pipe(tap(() => {
      this._refresh$.next();
    }
    ));
  }
  logout(usuario:Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.logoutUsuario, usuario).pipe(catchError(this.handleError)).pipe(tap(() => {
      this._refresh$.next();
    }
    ));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      console.error('An error occurred:', error.error);
    } else {
      console.error('El backend devolvió el código ${error.status}, el cuerpo era:', error.error)
    }
    return throwError(() => new Error('Algo malo sucedió; por favor, inténtelo de nuevo más tarde.'));
  }
}
