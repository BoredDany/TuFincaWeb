import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {UserComponent} from "./components/user/user.component";
import {PropertyComponent} from "./components/property/property.component";
import {RequestRentComponent} from "./components/request-rent/request-rent.component";
import {MyPropertiesComponent} from "./components/my-properties/my-properties.component";
import {RequestsandrentsComponent} from "./components/requestsandrents/requestsandrents.component";
import {EditRequestComponent} from "./components/edit-request/edit-request.component";
import {MainComponent} from "./components/main/main.component";
import {LoginComponent} from "./components/login/login.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {jwtGuardGuard} from "./guards/jwt-guard.guard";
import {PayComponent } from './components/pay/pay.component';

export const routes: Routes = [

  { path: "", canActivate: [jwtGuardGuard], children: [
      {path: 'user', component: UserComponent},
      { path: 'property/:id', component: PropertyComponent },
      { path: 'requestRent/:id', component: RequestRentComponent },
      { path: 'myProperties', component: MyPropertiesComponent },
      { path: 'requestsAndRents', component: RequestsandrentsComponent },
      { path: 'editRequest/:id', component: EditRequestComponent },
      { path: 'pay/:id', component: PayComponent},
      { path: 'home', component: HomeComponent,},
    ]
  },
  { path: 'register', component: MainComponent },
  {path: 'login', component: LoginComponent},
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
