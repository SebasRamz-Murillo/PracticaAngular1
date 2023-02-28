import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-reenviar-codigo',
  templateUrl: './reenviar-codigo.component.html',
  styleUrls: ['./reenviar-codigo.component.css']
})
export class ReenviarCodigoComponent {
  usuario?: Usuario;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
    });
  }

  OnSubmit(values: Usuario) {
    this.loginService.reenviarCorreo(values).subscribe((response: Usuario) => {
      localStorage.setItem('token', response.token);
    });
    this.router.navigate(['correo']);

  }
}
