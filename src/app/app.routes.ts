import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import {HomeComponent} from "./components/home/home.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {LoginComponent} from "./components/login/login.component";

export const routes: Routes = [
    { path: 'register', component: MainComponent },
    { path: 'home', component: HomeComponent },
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'register', pathMatch : 'full'},
    { path: "**", component: NotFoundComponent }
];
