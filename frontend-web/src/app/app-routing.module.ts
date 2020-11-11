import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './client/cart/cart.component';
import { ClientComponent } from './client/client.component';
import { IndexComponent } from './client/index/index.component';
import { MessagesComponent } from './client/messages/messages.component';
import { PostComponent } from './client/post/post.component';
import { ProductComponent } from './client/product/product.component';
import { ProfileComponent } from './client/profile/profile.component';
import { AuthAdminGuard } from './helpers/auth-admin.guard';
import { AuthClientGuard } from './helpers/auth-client.guard';
import { LoginComponent } from './principal/login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { RegisterComponent } from './principal/register/register.component';

const routes: Routes = [
    {
        path: '', component: PrincipalComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
    {
        path: 'client', component: ClientComponent, canActivate: [AuthClientGuard],
        children: [
            { path: 'index', component: IndexComponent },
            { path: 'post', component: PostComponent },
            { path: 'cart', component: CartComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'messages', component: MessagesComponent },
            {
                path: 'product', component: ProductComponent, children: [
                    { path: ':id', component: ProductComponent }
                ]
            },
            { path: '**', redirectTo: 'index' }
        ]
    },
    { path: 'admin', component: AdminComponent, canActivate: [AuthAdminGuard] },
    { path: '**', redirectTo: 'client' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
