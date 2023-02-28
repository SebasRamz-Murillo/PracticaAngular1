import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { catchError, min } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario?: Usuario;
  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const contraseñaInvalda = localStorage.getItem('contraseñaInvalda');
  }
  OnSubmit(values: Usuario) {
    if (this.form.valid) {
      this.loginService.login(values).pipe().subscribe((response: any) => {
        if (response) {
          console.log(response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/chef']);
        }
      }, (error) => {
        console.log(error);
        if (error.status === 403) {
          console.log('contraseña invalida');
          this.router.navigate(['/passwordInvalid']);
        } else {
          console.log('Error al iniciar sesión');
          this.router.navigate(['/cuentaDesactivada']);
        }
      });
      this.form.reset();
      localStorage.setItem('password', values.password);
    }

  }
  reenviarCorreo() {
    this.router.navigate(['/recuperarCuenta']);
  }
  activarCuenta() {
    this.router.navigate(['/activarCuenta']);
  }
}
