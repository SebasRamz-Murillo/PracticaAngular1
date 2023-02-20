import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-codigo-verificacion',
  templateUrl: './usuario-codigo-verificacion.component.html',
  styleUrls: ['./usuario-codigo-verificacion.component.css']
})
export class UsuarioCodigoVerificacionComponent implements OnInit, OnDestroy {
  url: string = '';
  form: FormGroup;
  usuario: Usuario[] = [];
  suscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.url = this.route.snapshot.params['url'];
  }
  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
    console.log('Se destruyó el componente');
  }
  OnSubmit(values: Usuario, url: string) {
    this.route
    environment.URL_SIGNED = this.url;
    console.log(environment.URL_SIGNED);
    this.router.navigate(['']);
    this.loginService.enviarCodigo(values,url).subscribe();
    this.form.reset();
  }

}
