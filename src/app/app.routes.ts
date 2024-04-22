import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';

export const routes: Routes = [
    { path: 'main', component: MainComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'footer', component: FooterComponent }
];
