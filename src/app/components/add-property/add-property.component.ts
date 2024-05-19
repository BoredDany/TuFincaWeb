import { Component } from '@angular/core';
import { Property } from '../../models/Property';
import { FormControl, FormGroup } from '@angular/forms';
import { Status } from '../../models/status';
import { MessageService } from 'primeng/api';
import { PropertyServiceService } from '../../services/properties/property-service.service';
import { Router } from '@angular/router';
import { Map, View } from 'ol';
import TitleLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
  providers: [MessageService],
})
export class AddPropertyComponent {
  property: Property;
  user = JSON.parse(localStorage.getItem("user")!!);

  active: number = 0;

    name: string = "";

    email: string = "";

    password: string | undefined = undefined;

    option1: boolean | undefined = false;

    option2: boolean | undefined = false;

    option3: boolean | undefined = false;

    option4: boolean | undefined = false;

    option5: boolean | undefined = false;

    option6: boolean | undefined = false;

    option7: boolean | undefined = false;

    option8: boolean | undefined = false;

    option9: boolean | undefined = false;

    option10: boolean | undefined = false;

  propertyForm = new FormGroup({
    nameProperty: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    price: new FormControl(''),
    area: new FormControl(''),
    description: new FormControl(''),
    rooms: new FormControl(''),
    bathrooms: new FormControl(''),
    parking: new FormControl(''),
    kitchens: new FormControl(''),
    floors: new FormControl(''),
  });

  constructor(
    private messageService: MessageService,
    private propertyService: PropertyServiceService,
    private router: Router
  ) {
    this.property = {} as Property;
  }

  submitProperty() {
    const propertyFormValues = {
      nameProperty: this.propertyForm.value.nameProperty,
      country: this.propertyForm.value.country,
      city: this.propertyForm.value.city,
      latitude: this.propertyForm.value.latitude,
      longitude: this.propertyForm.value.longitude,
      price: this.propertyForm.value.price,
      area: this.propertyForm.value.area,
      description: this.propertyForm.value.description,
      rooms: this.propertyForm.value.rooms,
      bathrooms: this.propertyForm.value.bathrooms,
      parking: this.propertyForm.value.parking,
      kitchens: this.propertyForm.value.kitchens,
      floors: this.propertyForm.value.floors,
    };

    // Check if any form control is empty
    if (Object.values(propertyFormValues).some((value) => !value)) {
      this.showError('Todos los campos son obligatorios!');
      return;
    }

    try {
      const priceNumber = propertyFormValues.price
        ? Number(propertyFormValues.price)
        : 0;
      const areaNumber = propertyFormValues.area
        ? Number(propertyFormValues.area)
        : 0;
      const roomsNumber = propertyFormValues.rooms
        ? Number(propertyFormValues.rooms)
        : 0;
      const bathroomsNumber = propertyFormValues.bathrooms
        ? Number(propertyFormValues.bathrooms)
        : 0;
      const parkingNumber = propertyFormValues.parking
        ? Number(propertyFormValues.parking)
        : 0;
      const kitchensNumber = propertyFormValues.kitchens
        ? Number(propertyFormValues.kitchens)
        : 0;
      const floorsNumber = propertyFormValues.floors
        ? Number(propertyFormValues.floors)
        : 0;

      this.property = new Property(
        0,
        propertyFormValues.nameProperty || '',
        propertyFormValues.country || '',
        propertyFormValues.city || '',
        propertyFormValues.latitude || '',
        propertyFormValues.longitude || '',
        priceNumber,
        areaNumber,
        propertyFormValues.description || '',
        roomsNumber,
        bathroomsNumber,
        parkingNumber,
        kitchensNumber,
        floorsNumber,
        Status.ACTIVE,
        this.user.idUser,
        [],
        [],
        []
      );

      //save property
      this.propertyService
        .postProperty(this.property)
        .then(() => {
          console.log('Property posted successfully');
          this.router.navigate(['/home'])
        })
        .catch((error) => {
          console.error('Error posting property:', error);
        });
        
    } catch (error) {
      if (error instanceof Error) {
        this.showError('Entrada inválida: ' + error.message);
      } else {
        this.showError('Entrada inválida');
      }
    }
  }

  showError(msg: string) {
    this.messageService.add({
      severity: 'error',
      summary: '¡Ups!',
      detail: msg,
    });
  }
}
