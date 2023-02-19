import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario-codigo-verificacion',
  templateUrl: './usuario-codigo-verificacion.component.html',
  styleUrls: ['./usuario-codigo-verificacion.component.css']
})
export class UsuarioCodigoVerificacionComponent implements OnInit, OnDestroy {
  form: FormGroup;
  usuario: Usuario[] = [];
  suscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.getruta();
    this.suscription = this.loginService.get_refresh$().subscribe(() => {
      this.getruta();
    }
    );
    console.log("ngOnInit");
  }
  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
    console.log('Se destruyó el componente');
  }
  OnSubmit(values: any) {
    this.loginService.enviarCodigo(values).subscribe();
    this.form.reset();
    this.location.back();
  }
  getruta() {
    this.loginService.getRutaSigned().subscribe(data => this.usuario = data);
  }
}
