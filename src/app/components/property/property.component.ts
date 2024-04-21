import { Component } from '@angular/core';
import { Property } from '../../models/Property';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyServiceService } from '../../services/properties/property-service.service';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [CommonModule, MenuComponent, FooterComponent],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css',
})
export class PropertyComponent {
  property: Property;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyServiceService,
    private router: Router
  ) {
    this.property = {} as Property;
  }

  ngOnInit(): void {
    this.loadPropertyDetail();
  }

  loadPropertyDetail() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;
    this.propertyService
      .getPropertybyId(id)
      .then((property) => {
        this.property = property;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  requestProperty () {
    this.router.navigate(['/requestRent', this.property.idProperty]);
  }


}
