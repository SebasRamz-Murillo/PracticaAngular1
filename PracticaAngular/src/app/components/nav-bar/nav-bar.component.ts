import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/Models/usuario.model';
import { Subscription } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  usuario?: Usuario[] = [];
  user?: Usuario;
  suscription?: Subscription;
  myData = localStorage.getItem('token');
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.getChefs();
    const myData = this.myData;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${myData}`);
    this.suscription = this.loginService.get_refresh$().subscribe(() => {
      this.getChefs();
    }
    );
  }

  getChefs() {
    this.loginService.obtenerDatosToken().subscribe(data => this.usuario = data);

    console.log(this.usuario);
  }
}
