import { Component } from '@angular/core';
import { Objeto } from 'src/app/models/objeto.model';
import { ObjetoService } from 'src/app/services/objeto.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpInterceptor } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-objeto',
  templateUrl: './objeto.component.html',
  styleUrls: ['./objeto.component.css']
})
export class ObjetoComponent implements OnInit, OnDestroy {
  objetos: Objeto[] = [];
  suscription?:Subscription;
  usuario?: Usuario;
  myToken = localStorage.getItem('token') || '';

  constructor(
    private objetoService: ObjetoService,
    private http: HttpClient) { }
  ngOnInit(): void {
    const token = this.myToken;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Usuario>(environment.URL_API+'/usuario/infoObjeto', { headers }).subscribe(data => this.usuario = data);


    this.getObjetos();
    this.suscription = this.objetoService.get_refresh$().subscribe(() => {
      this.getObjetos();
    }
    );
  }
  ngOnDestroy():void {
    this.suscription?.unsubscribe();
    console.log('Se destruyó el componente');
  }
  getObjetos() {
    this.objetoService.getIObjeto().subscribe(data => this.objetos = data);
  }
}
