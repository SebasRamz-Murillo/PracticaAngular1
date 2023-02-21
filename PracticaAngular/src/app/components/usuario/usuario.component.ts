import { Component, inject } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario[] = [];
  suscription?: Subscription;
  myToken = localStorage.getItem('token') || '';

  constructor(private usuarioService: UsuarioService,
    private loginService: LoginService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const token = this.myToken;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Usuario[]>(environment.URL_API+'/usuario/info', { headers }).subscribe(data => this.usuario = data);
    this.getUsuarios();
    this.suscription = this.usuarioService.get_refresh$().subscribe(() => {
      this.getUsuarios();
    }
    );
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => this.usuarios = data);
  }

}

