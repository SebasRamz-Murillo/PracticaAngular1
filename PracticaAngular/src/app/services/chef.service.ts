import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Chef } from '../models/chef.model';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChefService {

  private _refresh$ = new Subject<void>();
  private obtenerChefs = 'http://127.0.0.1:8000/api/chef/info';
  private crearChef = 'http://127.0.0.1:8000/api/chef/';
  private obtenerChef = 'http://127.0.0.1:8000/api/chef/info/';
  private modificarChef = 'http://127.0.0.1:8000/api/chef/update/'

  constructor(private http: HttpClient) { }
  get_refresh$() {
    return this._refresh$;
  }
  getChefs(): Observable<Chef[]> {
    return this.http.get<Chef[]>(this.obtenerChefs).pipe(retry(3), catchError(this.handleError))
  }
  addChefs(chef: Chef): Observable<Chef> {
    return this.http.post<Chef>(this.crearChef, chef).pipe(catchError(this.handleError)).pipe(tap(() => {
      this._refresh$.next();
    }
    ));
  }
  getOneChef(id: number): Observable<Chef[]> {
    return this.http.get<Chef[]>(this.obtenerChef + id).pipe(retry(3), catchError(this.handleError))
  }
  updateChef(chef: Chef): Observable<Chef> {
    return this.http.put<Chef>(this.modificarChef + chef.id, chef).pipe(catchError(this.handleError)).pipe(tap(() => {
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
