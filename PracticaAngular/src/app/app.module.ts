import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PageNoFoundComponent } from './components/page-no-found/page-no-found.component';
import { TableComponent } from './components/table/table.component';
import { ChefComponent } from './components/chef/chef.component';
import { ChefFormComponent } from './components/chef-form/chef-form.component';
import { ChefFormEditComponent } from './components/chef-form-edit/chef-form-edit.component';
import { ChefDeleteComponent } from './components/chef-delete/chef-delete.component';
import { IngredienteComponent } from './components/ingrediente/ingrediente.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { IngredienteFormComponent } from './components/ingrediente-form/ingrediente-form.component';
import { IngredienteFormEditComponent } from './components/ingrediente-form-edit/ingrediente-form-edit.component';
import { IngredienteDeleteComponent } from './components/ingrediente-delete/ingrediente-delete.component';
import { RecetaComponent } from './components/receta/receta.component';
<<<<<<< HEAD
import { RecetaFormComponent } from './components/receta-form/receta-form.component';
import { RecetaFormEditComponent } from './components/receta-form-edit/receta-form-edit.component';
import { RecetaDeleteComponent } from './components/receta-delete/receta-delete.component';
import { MapaComponent } from './components/mh/mapa/mapa.component';
import { MapaFormComponent } from './components/mh/mapa-form/mapa-form.component';
import { MapaFormEditComponent } from './components/mh/mapa-form-edit/mapa-form-edit.component';
import { MapaDeleteComponent } from './components/mh/mapa-delete/mapa-delete.component';
import { ObjetoComponent } from './components/mh/objeto/objeto.component';
import { ObjetoFormComponent } from './components/mh/objeto-form/objeto-form.component';
import { ObjetoFormEditComponent } from './components/mh/objeto-form-edit/objeto-form-edit.component';
import { ObjetoDeleteComponent } from './components/mh/objeto-delete/objeto-delete.component';
import { ZonaObjetoComponent } from './components/mh/zona-objeto/zona-objeto.component';
import { ZonaObjetoFormComponent } from './components/mh/zona-objeto-form/zona-objeto-form.component';
import { ZonaObjetoFormEditComponent } from './components/mh/zona-objeto-form-edit/zona-objeto-form-edit.component';
import { ZonaDeleteComponent } from './components/mh/zona-delete/zona-delete.component';
=======
import { CodigoComponent } from './components/codigo/codigo.component';
import { RegistroComponent } from './components/registro/registro.component';

>>>>>>> fde83053b3182644e3fec83e581227fb8c1f72a1

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    UsuarioComponent,
    PageNoFoundComponent,
    TableComponent,
    ChefComponent,
    ChefFormComponent,
    ChefFormEditComponent,
    ChefDeleteComponent,
    IngredienteComponent,
    NavBarComponent,
    IngredienteFormComponent,
    IngredienteFormEditComponent,
    IngredienteDeleteComponent,
    RecetaComponent,
<<<<<<< HEAD
    RecetaFormComponent,
    RecetaFormEditComponent,
    RecetaDeleteComponent,
    MapaComponent,
    MapaFormComponent,
    MapaFormEditComponent,
    MapaDeleteComponent,
    ObjetoComponent,
    ObjetoFormComponent,
    ObjetoFormEditComponent,
    ObjetoDeleteComponent,
    ZonaObjetoComponent,
    ZonaObjetoFormComponent,
    ZonaObjetoFormEditComponent,
    ZonaDeleteComponent,
=======
    CodigoComponent,
    RegistroComponent,
>>>>>>> fde83053b3182644e3fec83e581227fb8c1f72a1

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

