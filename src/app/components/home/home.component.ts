import {Component, OnInit} from '@angular/core';
import { PropertyServiceService } from '../../services/properties/property-service.service';
import { Property } from '../../models/Property';
import { Router } from '@angular/router';
import AOS from 'aos'
import {PhotosService} from "../../services/photos/photos.service";
import {Photo} from "../../models/Photo";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  value = ""

  title = 'Home';
  properties: any[] = [];

  constructor(
    private propertyService: PropertyServiceService,
    private photoService: PhotosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProperties();
    AOS.init();
  }

  loadProperties (){
    this.propertyService.getProperties().then( (properties) => {
      const propertiesWrapper = properties as any[];
      propertiesWrapper.forEach(async property => {
        if (property.photoIds.length == 0) {
          property.imageURL = "/assets/images/home.jpg"
        } else {
          const photo = await this.photoService.getOne(property.photoIds[0])
          property.imageURL = (photo as Photo).url;
        }
      })
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
