import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { OnInit,OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(){}
  myData = localStorage.getItem('token');
}
