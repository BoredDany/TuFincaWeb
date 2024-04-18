import { Component } from '@angular/core';
import { PropertyServiceService } from '../../services/property-service.service';
import { Property } from '../../models/Property';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Home';
  properties: Property[] = [];

  constructor(private propertyService: PropertyServiceService) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties (){
    this.propertyService.getPropertiesDeploy().then((properties) => {
      this.properties = properties;
    }).catch((error) => {
      console.error(error);
    });
  }
}
