import {Component, OnInit} from '@angular/core';
import { PropertyServiceService } from '../../services/properties/property-service.service';
import { Property } from '../../models/Property';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
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
