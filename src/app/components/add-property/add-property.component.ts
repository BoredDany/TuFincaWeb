import { Component } from '@angular/core';
import { Property } from '../../models/Property';
import { FormControl, FormGroup } from '@angular/forms';
import { Status } from '../../models/status';
import {ConfirmationService, MessageService} from 'primeng/api';
import { PropertyServiceService } from '../../services/properties/property-service.service';
import { Router } from '@angular/router';
import {PhotosService} from "../../services/photos/photos.service";
import {FileUploadHandlerEvent} from "primeng/fileupload";
import {S3Service} from "../../services/s3/s3.service";
import {Photo} from "../../models/Photo";

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
  providers: [MessageService, ConfirmationService],
})
export class AddPropertyComponent {
  property: Property;
  user = JSON.parse(localStorage.getItem("user")!!);

  active: number = 0;
  protected readonly onabort = onabort;
  uploadedFiles: File[] = [];
  urlPrefix = "https://tu-finca-web.s3.us-east-2.amazonaws.com/images/"
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
    private photoService: PhotosService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private s3Service: S3Service
  ) {
    this.property = {} as Property;
    this.s3Service = S3Service.getInstance()
  }

  public async buildPhotosIDs(uid: string, idProperty: number)  {
    const promisesArr = [];
    for (const file of this.uploadedFiles) {
      promisesArr.push(this.s3Service.uploadFile(file.name.replace(/ /g, "_"), file, uid));
    }
    const uploaded = await Promise.all(promisesArr);
    for (const upload of uploaded) {
      const urlImage = `${this.urlPrefix}${uid}/${upload}`;
      await this.photoService.create(
        new Photo(
          0,
          urlImage,
          `${uid} file`,
          Status.ACTIVE,
          idProperty
        )
      );
    }
  }

  submitProperty() {

    this.confirmationService.confirm({
      header: '¿Esta seguro de subir la propiedad?',
      message: 'Confirme para continuar.',
      accept: () => {

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
        if (
          Object
            .values(propertyFormValues)
            .some((value) => !value)
        ) {
          this.showError('Todos los campos son obligatorios!');
          console.log(Object.entries(propertyFormValues))
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
            .then(async prop => {
              await this.buildPhotosIDs(
                `${propertyFormValues.latitude}.${propertyFormValues.longitude}`,
                prop.idProperty
              );
              this.router.navigate(['/home'])
            })
            .catch((error) => {
              console.error('Error posting property:', error);
            });

        } catch (error) {
          if (error instanceof Error) {
            // @ts-ignore
            this.showError('Entrada inválida: ' + error.message);
          } else {
            this.showError('Entrada inválida');
          }
        }

      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Usted ha cancelado.', life: 3000 });
      }
    });

  }

  showError(msg: string) {
    this.messageService.add({
      severity: 'error',
      summary: '¡Ups!',
      detail: msg,
    });
  }

  uploadFiles(event: FileUploadHandlerEvent) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

}
