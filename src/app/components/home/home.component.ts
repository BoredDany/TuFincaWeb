import {Component, OnInit} from '@angular/core';
import { PropertyServiceService } from '../../services/properties/property-service.service';
import { Property } from '../../models/Property';
import { Router } from '@angular/router';
import AOS from 'aos'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  value = ""

  title = 'Home';
  properties: Property[] = [];

  constructor(
    private propertyService: PropertyServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProperties();
    AOS.init();
  }

  loadProperties (){
    this.propertyService.getProperties().then((properties) => {
      this.properties = properties;
    }).catch((error) => {
      console.error(error)
      if (error.response.status == 403) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        this.router.navigate(['/login']);
      }

    });
  }

  viewProperty(property: Property) {
    this.router.navigate(['/property', property.idProperty]);
  }

}
