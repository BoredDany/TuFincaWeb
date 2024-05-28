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
import { PayComponent } from "./components/pay/pay.component";
import { AddPropertyComponent } from "./components/add-property/add-property.component";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {EditRequestComponent} from "./components/edit-request/edit-request.component";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { ToastModule } from 'primeng/toast';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ImageModule } from 'primeng/image'
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { InputNumberModule } from 'primeng/inputnumber';
import { StepperModule } from 'primeng/stepper';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ToggleButtonModule} from 'primeng/togglebutton'
import { PasswordModule } from 'primeng/password';
import { MapComponent } from "./components/map/map.component";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextareaModule} from "primeng/inputtextarea";
import {AnimateOnScrollModule} from "primeng/animateonscroll";
import {FileUploadModule} from "primeng/fileupload";
import {HttpClientModule} from "@angular/common/http";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {GalleriaModule} from "primeng/galleria";
import { EditPropertyComponent } from "./components/edit-property/edit-property.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    MenuComponent,
    FooterComponent,
    EditPropertyComponent,
    MyPropertiesComponent,
    NotFoundComponent,
    PropertyComponent,
    RequestRentComponent,
    RequestsandrentsComponent,
    UserComponent,
    EditRequestComponent,
    PayComponent,
    AddPropertyComponent,
    MapComponent
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
    ToastModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ImageModule,
    CalendarModule,
    InputNumberModule,
    TabViewModule,
    AvatarModule,
    StepperModule,
    IconFieldModule,
    InputIconModule,
    CommonModule,
    ToggleButtonModule,
    PasswordModule,
    FloatLabelModule,
    InputTextareaModule,
    AnimateOnScrollModule,
    FileUploadModule,
    HttpClientModule,
    ConfirmDialogModule,
    GalleriaModule,
    NgOptimizedImage
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule {}
