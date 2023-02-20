import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PageNoFoundComponent } from './components/page-no-found/page-no-found.component';
import { HeaderComponent } from './components/header/header.component';
import { ChefComponent } from './components/chef/chef.component';
import { ChefFormEditComponent } from './components/chef-form-edit/chef-form-edit.component';
import { ChefDeleteComponent } from './components/chef-delete/chef-delete.component';
import { IngredienteComponent } from './components/ingrediente/ingrediente.component';
import { ChefFormComponent } from './components/chef-form/chef-form.component';
import { IngredienteFormComponent } from './components/ingrediente-form/ingrediente-form.component';
import { IngredienteFormEditComponent } from './components/ingrediente-form-edit/ingrediente-form-edit.component';
import { IngredienteDeleteComponent } from './components/ingrediente-delete/ingrediente-delete.component';
import { RecetaComponent } from './components/receta/receta.component';
import { RecetaFormComponent } from './components/receta-form/receta-form.component';
import { RecetaFormEditComponent } from './components/receta-form-edit/receta-form-edit.component';
import { RecetaDeleteComponent } from './components/receta-delete/receta-delete.component';
import { MapaComponent } from './components/mh/mapa/mapa.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioRegistroComponent } from './components/usuario-registro/usuario-registro.component';
import { UsuarioCodigoVerificacionComponent } from './components/usuario-codigo-verificacion/usuario-codigo-verificacion.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'registro', component: UsuarioRegistroComponent },
  { path: 'registro/verificar/:url', component: UsuarioCodigoVerificacionComponent},

  { path: 'chef', component: ChefComponent },
  { path: 'chef/create', component: ChefFormComponent},
  { path: 'chef/edit/:id', component: ChefFormEditComponent },
  { path: 'chef/delete/:id', component: ChefDeleteComponent},

  { path: 'ingredientes', component: IngredienteComponent },
  { path: 'ingredientes/create', component: IngredienteFormComponent},
  { path: 'ingredientes/edit/:id', component: IngredienteFormEditComponent},
  { path: 'ingredientes/delete/:id', component: IngredienteDeleteComponent},

  { path: 'recetas', component: RecetaComponent},
  { path: 'recetas/create', component: RecetaFormComponent},
  { path: 'recetas/edit/:id', component: RecetaFormEditComponent},
  { path: 'recetas/delete/:id', component: RecetaDeleteComponent},

  { path: 'mapas', component: MapaComponent},


  { path: 'usuarios', component: UsuarioComponent },
  { path: '**', component: PageNoFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
