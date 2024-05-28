import { Component } from '@angular/core';
import { Property } from '../../models/Property';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyServiceService } from '../../services/properties/property-service.service';
import { PhotosService } from '../../services/photos/photos.service';
import { Photo } from '../../models/Photo';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrl: './edit-property.component.css',
  providers: [MessageService]
})
export class EditPropertyComponent {

  propertyForm: FormGroup; 
  property: Property;
  images: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyServiceService,
    private photoService: PhotosService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.property = {} as Property;

    // Se inicializa el FormGroup en el constructor para seguir las mejores prácticas
    this.propertyForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      rooms: new FormControl('', Validators.required),
      bathrooms: new FormControl('', Validators.required),
      parking: new FormControl('', Validators.required),
      kitchens: new FormControl('', Validators.required),
      floors: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    
  }

  loading: boolean = false;

  ngOnInit(): void {
    this.loadPropertyDetail();
    this.loadPropertyData();
  }

  private loadPropertyData() {
    const propertySelected =  { name: this.property.name, 
      price: this.property.price, 
      area: this.property.area, 
      rooms: this.property.rooms,
      bathrooms: this.property.bathrooms,
      parking: this.property.parking,
      kitchens: this.property.kitchens,
      floors: this.property.floors,
      description: this.property.description,

     };
    this.propertyForm.patchValue(propertySelected);
  }

  loadPropertyDetail() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;
    this.propertyService
      .getPropertybyId(id)
      .then(async (property) => {
        const refTemp = []
        for (const photoId of property.photoIds) {
          const p = await this.photoService.getOne(photoId);
          refTemp.push({
            imageSrc: (p as Photo).url
          })
        }
        this.property = property;
        this.propertyForm.patchValue(this.property);

        if (refTemp.length == 0) {
          this.images.push({
            imageSrc: "https://tu-finca-web.s3.us-east-2.amazonaws.com/home.jpg"
          })
        } else {
          this.images = [...refTemp];
        }
        console.log(this.images)
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }

  submitPropertyDetails() {
    if (!this.propertyForm.valid) {
        this.showError("Valida la informacion que ingresaste.")
    } else {
      this.showWait()
      this.loading = true;
      const updatedProperty = new Property(
        this.property.idProperty,
        this.propertyForm.value.name,
        this.property.country,
        this.property.city,
        this.property.latitude,
        this.property.longitude,
        this.propertyForm.value.price,
        this.propertyForm.value.area,
        this.propertyForm.value.description,
        this.propertyForm.value.rooms,
        this.propertyForm.value.bathrooms,
        this.propertyForm.value.parking,
        this.propertyForm.value.kitchens,
        this.propertyForm.value.floors,
        this.property.status,
        this.property.ownerId,
        this.property.rentIds,
        this.property.rentRequestIds,
        this.property.photoIds
      );

      this.propertyService.updateProperty(updatedProperty).then(
        response => {
          console.log('Property updated successfully', response);
          this.router.navigate(['/user']);
        }
      ).catch(
        error => {
          this.showError("No pudimos actualizar la propiedad.")
          console.error('Error updating property', error);
          this.loading = false;
        }
      );
    }
  }

  showError(msg: string) {
    this.messageService.add({
      severity: 'error',
      summary: '¡Error!',
      detail: msg
    })
  }

  showWait() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Actualizando tu propiedad...',
      detail: 'Estamos actualizando tu propriedad.'
    })
  }
  
}
