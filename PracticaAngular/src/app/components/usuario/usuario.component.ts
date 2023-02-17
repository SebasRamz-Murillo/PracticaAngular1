import { Component } from '@angular/core';
import { Route,ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from '../../Models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  constructor(){
  }

  ngOnInit(): void{
  }

}
