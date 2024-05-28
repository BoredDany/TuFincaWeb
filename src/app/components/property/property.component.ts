import {Component, OnInit} from '@angular/core';
import { Property } from '../../models/Property';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyServiceService } from '../../services/properties/property-service.service';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import {PhotosService} from "../../services/photos/photos.service";
import {Photo} from "../../models/Photo";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrl: './property.component.css',
  providers: [MessageService]
})
export class PropertyComponent implements OnInit {
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
  }

  loading: boolean = false;

  ngOnInit(): void {
    this.loadPropertyDetail();
  }

  showWait() {
    this.messageService.add({ severity: 'warn', summary: 'Obteniendo detalles...', detail: 'Obteniendo los detalles de la propiedad' })
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

  requestProperty () {
    this.loading = true;
    this.router.navigate(['/requestRent', this.property.idProperty]);
  }


}
