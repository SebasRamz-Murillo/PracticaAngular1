import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingrediente } from 'src/app/models/ingrediente.model';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent implements OnInit, OnDestroy {
  ingrediente: Ingrediente[] = [];
  suscription?: Subscription;
  usuario?: Usuario;
  myToken = localStorage.getItem('token') || '';

  constructor(private ingredienteService: IngredienteService,
    private loginService: LoginService,
    private http: HttpClient) { }
  ngOnInit(): void {
    const token = this.myToken;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<Usuario>(environment.URL_API+'/usuario/infoObjeto', { headers }).subscribe(data => this.usuario = data);
    this.getIngredientes();
    this.suscription = this.ingredienteService.get_refresh$().subscribe(() => {
      this.getIngredientes();
    });
  }
  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
    console.log('Se destruyó el componente');
  }
  //Metodos
  getIngredientes() {
    this.ingredienteService.getIngredientes().subscribe(data => this.ingrediente = data);
  }
}
