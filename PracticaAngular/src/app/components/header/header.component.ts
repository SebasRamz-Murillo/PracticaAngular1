import { Component } from '@angular/core';
import { Chef } from 'src/app/models/chef.model';
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
}
