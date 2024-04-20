import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { PropertyComponent } from './components/property/property.component';
import { MenuComponent } from './components/menu/menu.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'user', component: UserComponent},
    { path: 'property/:id', component: PropertyComponent },
];
