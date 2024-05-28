import { Component } from '@angular/core';
import { Property } from '../../models/Property';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyServiceService } from '../../services/properties/property-service.service';
import { PhotosService } from '../../services/photos/photos.service';
import { Photo } from '../../models/Photo';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrl: './edit-property.component.css'
})
export class EditPropertyComponent {

  propertyForm: FormGroup; 
  property: Property;
  images: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyServiceService,
    private photoService: PhotosService,
    private router: Router
  ) {
    this.property = {} as Property;

    // Se inicializa el FormGroup en el constructor para seguir las mejores prácticas
    this.propertyForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      area: new FormControl('', [Validators.required, Validators.email]),
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
  }

  private loadUserData() {
    const propertySelected =  { name: this.property.name, 
      price: this.property.price, 
      area: this.property.area, 
      rooms: this.property.rooms,
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

  submitPropertyDetails(){

  }
  
}
