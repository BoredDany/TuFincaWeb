import {Component, Input, OnInit} from '@angular/core';
import 'ol/ol.css';
import { Style, Icon } from 'ol/style';
import Map from 'ol/Map';
import View from 'ol/View';
import { Feature } from 'ol'
import { OSM, Vector } from 'ol/source';
import { Tile, Vector as VectorLayer } from 'ol/layer';
import { toLonLat, fromLonLat } from 'ol/proj'
import { Point, Geometry } from 'ol/geom'
import { reverseGeocode } from '@esri/arcgis-rest-geocoding'
import { ApiKeyManager } from '@esri/arcgis-rest-request'
import { environment } from '../../environment/environment';
import {FormControl} from "@angular/forms";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  providers: [MessageService]
})
export class MapComponent {
  map!: Map;
  marker: VectorLayer<Feature<Geometry>> | undefined;

  constructor(
    private messageService : MessageService
  ) {
    navigator.geolocation.getCurrentPosition(
      e => this.initMap(fromLonLat([e.coords.longitude, e.coords.latitude]), 12),
      error => {
        this.initMap([0, 0], 2);
        console.log(error);
      }
    );
  }

  @Input()
  latitude: FormControl<string | null> | undefined;

  @Input()
  longitude: FormControl<string | null> | undefined;

  @Input()
  country: FormControl<string | null> | undefined;

  @Input()
  city: FormControl<string | null> | undefined;

  initMap(centerLocation: any, zoom: number) {
    this.map = new Map({
      layers: [
        new Tile({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: centerLocation,
        zoom,
        maxZoom: 18,
      }),
    });

    const authGeocoder = ApiKeyManager.fromKey(environment.GEOCODER_API_KEY);

    this.map.on('click', async e => {

      this.showWait()

      const latLong = toLonLat(e.coordinate);
      const data = await reverseGeocode(
        latLong as [number, number],
        { authentication: authGeocoder }
      );

      if (this.marker != undefined) this.map.removeLayer(this.marker);

      this.marker = new VectorLayer({
        source: new Vector(),
        style: new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: "assets/icons/marker-icon.png"
          })
        })
      })

      this.map.addLayer(this.marker);
      const pointMark = new Feature(
        new Point(fromLonLat(latLong))
      );
      this.marker.getSource()?.addFeature(pointMark);
      console.log(data)
      this.latitude?.setValue(latLong[0].toString());
      this.longitude?.setValue(latLong[1].toString());
      this.city?.setValue(data.address["City"])
      this.country?.setValue(data.address["CntryName"])
    });
  }

  private showWait() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Obteniendo ubicación..',
      detail: 'Estamos obteniendo los detalles de tu marcador.'
    })
  }
}
