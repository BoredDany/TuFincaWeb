import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import { Style, Icon } from 'ol/style';
import Map from 'ol/Map';
import View from 'ol/View';
import { Feature } from 'ol'
import { OSM, Vector } from 'ol/source';
import { Tile, Vector as VectorLayer } from 'ol/layer';
import Select from 'ol/interaction/Select'
import { click } from 'ol/events/condition'
import { toLonLat, fromLonLat } from 'ol/proj'
import { Point, Geometry } from 'ol/geom'
import { reverseGeocode } from '@esri/arcgis-rest-geocoding'
import { ApiKeyManager } from '@esri/arcgis-rest-request'
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  map!: Map;
  marker: VectorLayer<Feature<Geometry>> | undefined;

  initMap(centerLocation: any) {
    this.map = new Map({
      layers: [
        new Tile({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({ 
        center: centerLocation,
        zoom: 13,maxZoom: 18, 
      }),
    });

    const authGeocoder = ApiKeyManager.fromKey(environment.GEOCODER_API_KEY);

    this.map.on('click', async e => {
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
    });
  }

  ngOnInit(): void {

    navigator.geolocation.getCurrentPosition(
      e => this.initMap(fromLonLat([e.coords.longitude, e.coords.latitude])),
      error => {
        this.initMap([0, 0]);
        console.log(error);
      }
    );
 }
}
