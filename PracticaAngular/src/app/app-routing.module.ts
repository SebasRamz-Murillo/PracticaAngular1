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
import { MapaFormComponent } from './components/mh/mapa-form/mapa-form.component';
import { MapaFormEditComponent } from './components/mh/mapa-form-edit/mapa-form-edit.component';
import { MapaDeleteComponent } from './components/mh/mapa-delete/mapa-delete.component';
import { ObjetoComponent } from './components/mh/objeto/objeto.component';
import { ObjetoFormComponent } from './components/mh/objeto-form/objeto-form.component';
import { ObjetoFormEditComponent } from './components/mh/objeto-form-edit/objeto-form-edit.component';
import { ObjetoDeleteComponent } from './components/mh/objeto-delete/objeto-delete.component';
import { MapaObjetoComponent } from './components/mh/zona-objeto/zona-objeto.component';
import { ZonaObjetoFormComponent } from './components/mh/zona-objeto-form/zona-objeto-form.component';
import { ZonaObjetoFormEditComponent } from './components/mh/zona-objeto-form-edit/zona-objeto-form-edit.component';
import { ZonaDeleteComponent } from './components/mh/zona-delete/zona-delete.component';
import { MonstruosComponent } from './components/mh/monstrous/monstrous.component';
import { MonstrousDeleteComponent } from './components/mh/monstrous-delete/monstrous-delete.component';
import { MonstrousFormComponent } from './components/mh/monstrous-form/monstrous-form.component';
import { MonstrousFormEditComponent } from './components/mh/monstrous-form-edit/monstrous-form-edit.component';
import { ValidarRolGuard } from './guards/validar-rol.guard';
import { PermisosComponent } from './components/permisos/permisos.component';
import { ValidarRolGuestGuard } from './guards/validar-rol-guest.guard';
import { ValidarCuentaGuard } from './guards/validar-cuenta.guard';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { PermisosSesionExpiradaComponent } from './components/permisos-sesion-expirada/permisos-sesion-expirada.component';
import { PermisosCuentaDesactivadaComponent } from './components/permisos-cuenta-desactivada/permisos-cuenta-desactivada.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'error', component: PermisosComponent },
  { path: 'sesionExpirada', component: PermisosSesionExpiradaComponent },
  { path: 'cuentaDesactivada', component: PermisosCuentaDesactivadaComponent },
  { path: 'registro', component: UsuarioRegistroComponent },
  { path: 'registro/verificar/:url', component: UsuarioCodigoVerificacionComponent},
  //Verificar si es usuario o administrador
  { path: 'chef', component: ChefComponent ,canActivate: [ValidarRolGuard, ValidarCuentaGuard]},
  { path: 'chef/create', component: ChefFormComponent,canActivate: [ValidarRolGuard, ValidarCuentaGuard]},
  { path: 'chef/edit/:id', component: ChefFormEditComponent ,canActivate: [ValidarRolGuard, ValidarCuentaGuard]},
  { path: 'chef/delete/:id', component: ChefDeleteComponent,canActivate: [ValidarRolGuard, ValidarCuentaGuard]},
  //Verificar si es usuario o administrador
  { path: 'ingredientes', component: IngredienteComponent ,canActivate: [ValidarRolGuard, ValidarCuentaGuard]},
  { path: 'ingredientes/create', component: IngredienteFormComponent,canActivate: [ValidarRolGuard, ValidarCuentaGuard]},
  { path: 'ingredientes/edit/:id', component: IngredienteFormEditComponent,canActivate: [ValidarRolGuard, ValidarCuentaGuard]},
  { path: 'ingredientes/delete/:id', component: IngredienteDeleteComponent,canActivate: [ValidarRolGuard, ValidarCuentaGuard]},
  //Verificar si es usuario o administrador
  { path: 'recetas', component: RecetaComponent,canActivate: [ValidarRolGuard, ValidarCuentaGuard]},
  { path: 'recetas/create', component: RecetaFormComponent,canActivate: [ValidarRolGuard, ValidarCuentaGuard]},
  { path: 'recetas/edit/:id', component: RecetaFormEditComponent,canActivate: [ValidarRolGuard, ValidarCuentaGuard]},
  { path: 'recetas/delete/:id', component: RecetaDeleteComponent,canActivate: [ValidarRolGuard, ValidarCuentaGuard]},


  { path: 'mapas', component: MapaComponent, canActivate: [ValidarRolGuestGuard, ValidarCuentaGuard]},
  { path: 'mapa/create', component: MapaFormComponent, canActivate: [ValidarRolGuestGuard, ValidarCuentaGuard]},
  { path: 'mapas/edit/:id', component: MapaFormEditComponent, canActivate: [ValidarRolGuestGuard, ValidarCuentaGuard]},
  { path: 'mapas/delete/:id', component: MapaDeleteComponent, canActivate: [ValidarRolGuestGuard, ValidarCuentaGuard]},

  { path: 'objeto', component: ObjetoComponent, canActivate: [ValidarRolGuestGuard, ValidarCuentaGuard]},
  { path: 'objeto/create', component: ObjetoFormComponent, canActivate: [ValidarRolGuestGuard, ValidarCuentaGuard]},
  { path: 'objeto/edit/:id', component: ObjetoFormEditComponent, canActivate: [ValidarRolGuestGuard, ValidarCuentaGuard]},
  { path: 'objeto/delete/:id', component: ObjetoDeleteComponent, canActivate: [ValidarRolGuestGuard, ValidarCuentaGuard]},

  { path: 'zonaObjetos', component: MapaObjetoComponent},
  { path: 'zonaObjetos/create', component: ZonaObjetoFormComponent},
  { path: 'zonaObjetos/edit/:id', component: ZonaObjetoFormEditComponent},
  { path: 'zonaObjetos/delete/:id', component: ZonaDeleteComponent},

  { path: 'monstruos', component: MonstruosComponent},
  { path: 'monstruos/create', component: MonstrousFormComponent},
  { path: 'monstruos/edit/:id', component: MonstrousFormEditComponent},
  { path: 'monstruos/delete/:id', component: MonstrousDeleteComponent},


  { path: 'usuarios', component: UsuarioComponent },
  { path: 'usuarios/edit/:id', component: UsuarioComponent },
  { path: 'usuarios/editRole/:id', component: UsuarioComponent },

  { path: '**', component: PageNoFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
