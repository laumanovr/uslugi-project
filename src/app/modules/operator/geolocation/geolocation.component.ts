import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {MapsAPILoader} from '@agm/core';
import {CommonService} from '../../../services/common.service';

declare const google: any;

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements OnInit {

  address: string;

  private geocoder;
  private infoWindow;
  private map;
  private lat = 42.8481654;
  private lng = 74.563707;
  private zoom = 15;

  constructor(private mapsAPILoader: MapsAPILoader,
              private cdr: ChangeDetectorRef,
              private common: CommonService,
              private location: Location) {
  }

  ngOnInit() {
    this.mapInit();
  }

  /**
   * Navigate back
   */
  onCLickBack() {
    this.location.back();
  }

  /**
   * Get location and navigate back
   */
  onClickOk() {
    this.common.geoAddress = this.address;
    this.location.back();
  }

  /**
   * Map initialization
   */
  private mapInit() {
    const self = this;
    this.mapsAPILoader.load().then(() => {
      self.geocoder = new google.maps.Geocoder;
      self.infoWindow = new google.maps.InfoWindow;
      self.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: self.lat, lng: self.lng},
        zoom: self.zoom
      });

      self.reverseGeocode({lat: self.lat, lng: self.lng});

      self.getGeolocation();

      self.map.addListener('dragend', () => {
        self.mapDragged();
      });
    });
  }

  /**
   * Get geolocation
   */
  getGeolocation() {
    const self = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        self.reverseGeocode(pos);

        self.infoWindow.setPosition(pos);
        // infoWindow.setContent('Location found.');
        // infoWindow.open(map);
        self.map.setCenter(pos);
      }, () => {
        // handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  /**
   * Get address from geocode
   */
  private reverseGeocode(latlng) {
    this.geocoder.geocode({'location': latlng}, (results) => {
      if (results) {
        if (results[0].formatted_address.includes('Unnamed Road')) {
          this.address = 'Адрес не найден';
          this.cdr.detectChanges();
        } else {
          this.address = results[0].formatted_address;
          this.cdr.detectChanges();
        }
      } else {
        this.address = 'Адрес не найден';
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Get address when map is dragged
   */
  private mapDragged() {
    this.reverseGeocode(this.map.getCenter().toJSON());
  }

}
