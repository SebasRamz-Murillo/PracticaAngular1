import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PageNoFoundComponent } from './components/page-no-found/page-no-found.component';
import { HeaderComponent } from './components/header/header.component';
import { ChefComponent } from './components/chef/chef.component';
import { ChefFormEditComponent } from './components/chef-form-edit/chef-form-edit.component';

const routes: Routes = [
  { path: 'home', component: HeaderComponent },
  { path: 'chef', component: ChefComponent },
  { path: 'chef/edit/:id', component: ChefFormEditComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: '**', component: PageNoFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
