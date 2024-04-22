import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import {HomeComponent} from "./components/home/home.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

export const routes: Routes = [
    { path: 'login', component: MainComponent },
    { path: 'home', component: HomeComponent },
    { path: "**", component: NotFoundComponent }
];
