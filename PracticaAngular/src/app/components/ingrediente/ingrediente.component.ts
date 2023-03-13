import { Component, OnInit, OnDestroy } from '@angular/core';
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
  eventSource?: EventSource;

  constructor(
    private ingredienteService: IngredienteService,
    private loginService: LoginService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const token = this.myToken;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .get<Usuario>(`${environment.URL_API}/usuario/infoObjeto`, { headers })
      .subscribe((data) => (this.usuario = data));

    this.getIngredientes();

    // Crea el objeto EventSource
    this.eventSource = new EventSource(`${environment.URL_API}/ingredientes/stream`);

    // Suscríbete al evento "message"
    this.eventSource.addEventListener('message', (event: MessageEvent) => {
      // Actualiza la lista de ingredientes
      this.getIngredientes();
    });

    // Maneja el evento "error"
    this.eventSource.addEventListener('error', (event: Event) => {
      console.error('EventSource error:', event);
      // Intenta reconectar después de 5 segundos
      setTimeout(() => this.ngOnInit(), 5000);
    });

    // Suscríbete al evento de actualización de ingredientes
    this.suscription = this.ingredienteService.get_refresh$().subscribe(() => {
      this.getIngredientes();
    });
  }

  ngOnDestroy(): void {
    // Cierra la conexión con EventSource
    if (this.eventSource) {
      this.eventSource.close();
    }
    // Cancela la suscripción al servicio de ingredientes
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
  }

  // Métodos
  getIngredientes() {
    this.ingredienteService.getIngredientes().subscribe((data) => (this.ingrediente = data));
  }
}
