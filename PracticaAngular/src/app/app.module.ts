import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
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
import { CodigoComponent } from './components/codigo/codigo.component';
import { RegistroComponent } from './components/registro/registro.component';

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
    CodigoComponent,
    RegistroComponent,

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
