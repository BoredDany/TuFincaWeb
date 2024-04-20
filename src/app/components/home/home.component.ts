import { Component } from '@angular/core';
import { PropertyServiceService } from '../../services/properties/property-service.service';
import { Property } from '../../models/Property';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenuComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Home';
  properties: Property[] = [];

  constructor(
    private propertyService: PropertyServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties (){
    this.propertyService.getProperties().then((properties) => {
      this.properties = properties;
    }).catch((error) => {
      console.error(error);
    });
  }

  viewProperty(property: Property) {
    this.router.navigate(['/property', property.idProperty]);
  }

}
