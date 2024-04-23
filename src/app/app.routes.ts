import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { PropertyComponent } from './components/property/property.component';
import { RequestRentComponent } from './components/request-rent/request-rent.component';
import { MyPropertiesComponent } from './components/my-properties/my-properties.component';
import { RequestsandrentsComponent } from './components/requestsandrents/requestsandrents.component';
import { EditRequestComponent } from './components/edit-request/edit-request.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'user', component: UserComponent},
    { path: 'property/:id', component: PropertyComponent },
    { path: 'requestRent/:id', component: RequestRentComponent },
    { path: 'myProperties', component: MyPropertiesComponent },
    { path: 'requestsAndRents', component: RequestsandrentsComponent },
    { path: 'editRequest/:id', component: EditRequestComponent }
];
