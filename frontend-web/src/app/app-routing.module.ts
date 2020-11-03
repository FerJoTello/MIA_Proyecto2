import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { IndexComponent } from './client/index/index.component';
import { MessagesComponent } from './client/messages/messages.component';
import { PostComponent } from './client/post/post.component';
import { ProfileComponent } from './client/profile/profile.component';
import { AuthAdminGuard } from './helpers/auth-admin.guard';
import { AuthClientGuard } from './helpers/auth-client.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'client', component: ClientComponent, canActivate: [AuthClientGuard],
        children: [
            { path: 'index', component: IndexComponent }, { path: 'post', component: PostComponent }, { path: 'profile', component: ProfileComponent }, { path: 'messages', component: MessagesComponent }, { path: '**', redirectTo: 'index' }
        ]
    },
    { path: 'admin', component: AdminComponent, canActivate: [AuthAdminGuard] },
    { path: '**', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
