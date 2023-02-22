import { Component } from '@angular/core';
import { ActivatedRoute, Route, ParamMap } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuario-form-edit',
  templateUrl: './usuario-edit-role.component.html',
  styleUrls: ['./usuario-edit-role.component.css']
})
export class UsuarioEditRoleComponent implements OnInit {
  form: FormGroup;
  usuario2?: Usuario;

  usuario: Usuario = { id: 0, name: '', ap_paterno: '', ap_materno: '', email: '', telefono: "", codigo: 0, activo: false, rol_id: 0, password: '', ruta: '', token: '', estado: '', role: '', boton: '' };
  suscription?: Subscription;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      rol_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
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
        rol_id: this.usuario2?.rol_id
      });
    });
  }

  OnSubmit(values: Usuario): void {
    // Obtener el valor actual del usuario2 y modificar únicamente el rol

    // Llamar al servicio de actualización de usuario con el objeto actualizado
    this.usuarioService.updateUsuarioRol(values).subscribe();

    // Resetear el formulario
    this.form.reset();
    };

  }
