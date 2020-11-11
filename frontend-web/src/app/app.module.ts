import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './principal/login/login.component';
import { RegisterComponent } from './principal/register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { PassRecoveryComponent } from './pass-recovery/pass-recovery.component';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';
import { MenuAdminComponent } from './admin/menu-admin/menu-admin.component';
import { MenuClientComponent } from './client/menu-client/menu-client.component';
import { IndexComponent } from './client/index/index.component';
import { ProfileComponent } from './client/profile/profile.component';
import { MessagesComponent } from './client/messages/messages.component';
import { PostComponent } from './client/post/post.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from './services/product.service';
import { PhotoService } from './services/photo.service';
import { PrincipalComponent } from './principal/principal.component';
import { ProductCardComponent } from './client/index/product-card/product-card.component';
import { ProductComponent } from './client/product/product.component';
import { CartComponent } from './client/cart/cart.component';
import { RowProductComponent } from './client/cart/row-product/row-product.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        AlertComponent,
        PassRecoveryComponent,
        ClientComponent,
        AdminComponent,
        MenuAdminComponent,
        MenuClientComponent,
        IndexComponent,
        ProfileComponent,
        MessagesComponent,
        PostComponent,
        PrincipalComponent,
        ProductCardComponent,
        ProductComponent,
        CartComponent,
        RowProductComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        TagInputModule,
        BrowserAnimationsModule
    ],
    providers: [AuthenticationService, AlertService, UserService, ProductService, PhotoService],
    bootstrap: [AppComponent]
})
export class AppModule { }
