import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {MainComponent} from "./components/main/main.component";
import {MenuComponent} from "./components/menu/menu.component";
import {FooterComponent} from "./components/footer/footer.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {MyPropertiesComponent} from "./components/my-properties/my-properties.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {PropertyComponent} from "./components/property/property.component";
import {RequestRentComponent} from "./components/request-rent/request-rent.component";
import {RequestsandrentsComponent} from "./components/requestsandrents/requestsandrents.component";
import {UserComponent} from "./components/user/user.component";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {EditRequestComponent} from "./components/edit-request/edit-request.component";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { ToastModule } from 'primeng/toast';
import { PayComponent } from './components/pay/pay.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    MenuComponent,
    FooterComponent,
    MyPropertiesComponent,
    NotFoundComponent,
    PropertyComponent,
    RequestRentComponent,
    RequestsandrentsComponent,
    UserComponent,
    EditRequestComponent,
    PayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatHint,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatButton,
    MatInput,
    BrowserAnimationsModule,
    RouterLink,
    RouterLinkActive,
    ToastModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule {}
