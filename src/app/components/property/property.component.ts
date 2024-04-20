import { Component } from '@angular/core';
import { Property } from '../../models/Property';
import { ActivatedRoute } from '@angular/router';
import { PropertyServiceService } from '../../services/property-service.service';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [MenuComponent, FooterComponent],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css',
})
export class PropertyComponent {
  property: Property;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyServiceService
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
      .getPropertybyIdDeploy(id)
      .then((property) => {
        // Aquí puedes hacer algo con los detalles de la propiedad, como asignarlos a una variable de la clase.
        this.property = property;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
