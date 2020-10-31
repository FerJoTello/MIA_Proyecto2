import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { AuthAdminGuard } from './helpers/auth-admin.guard';
import { AuthClientGuard } from './helpers/auth-client.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'client', component: ClientComponent, canActivate: [AuthClientGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthAdminGuard]},
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
