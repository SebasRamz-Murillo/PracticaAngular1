import { Component } from '@angular/core';
import { ActivatedRoute, Route, ParamMap } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuario-form-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {
  form: FormGroup;
  usuario2?: Usuario;
  user?: Usuario;
  muToken = localStorage.getItem('token') || '';
  usuario: Usuario = { id: 0, name: '', ap_paterno: '', ap_materno: '', email: '', telefono: "", codigo: 0, activo: false, rol_id: 0, password: '', ruta: '', token: '', estado: '', role: '', boton: '' };
  suscription?: Subscription;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      ap_paterno: ['', Validators.required],
      ap_materno: ['', Validators.required],
      activo : ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.muToken;
    const token = this.muToken;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<Usuario>(environment.URL_API + '/usuario/infoObjeto', { headers }).subscribe(data => this.user = data);


    this.id = this.route.snapshot.params['id'];
    this.getOneUsuario(this.id);
    this.suscription = this.usuarioService.get_refresh$().subscribe(() => {
      this.getOneUsuario(this.id);
    });
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  getOneUsuario(id: number): void {
    this.usuarioService.getOneUsuario(id).subscribe((data: Usuario[]) => {
      this.usuario2 = data[0];
      this.form.patchValue({
        id: this.usuario2?.id,
        name: this.usuario2?.name,
        ap_paterno: this.usuario2?.ap_paterno,
        ap_materno: this.usuario2?.ap_materno,
        activo: this.usuario2?.activo,
      });
    });
  }

  OnSubmit(values: Usuario): void {
    // Obtener el valor actual del usuario2 y modificar únicamente el rol
    // Llamar al servicio de actualización de usuario con el objeto actualizado
    this.usuarioService.updateUsuario(values).subscribe();

    // Resetear el formulario
    this.form.reset();
  };


}


