import { Component } from '@angular/core';
import { Mapa } from 'src/app/models/mapa.model';
import { MapaService } from 'src/app/services/mapa.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpInterceptor } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, OnDestroy {
  mapas?: Mapa[] = [];
  suscription?:Subscription;
  usuario?: Usuario;
  myToken = localStorage.getItem('token') || '';

  constructor(
    private mapaService: MapaService,
    private http: HttpClient) { }
  ngOnInit(): void {
    const token = this.myToken;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Usuario>(environment.URL_API+'/usuario/infoObjeto', { headers }).subscribe(data => this.usuario = data);

    this.getMapas();
    this.suscription = this.mapaService.get_refresh$().subscribe(() => {
      this.getMapas();
    }
    );
  }
  ngOnDestroy():void {
    this.suscription?.unsubscribe();
    console.log('Se destruyó el componente');
  }
  getMapas() {
    this.mapaService.getMapas().subscribe(data => this.mapas = data);
  }
}
