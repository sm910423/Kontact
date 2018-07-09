// import { HttpClient } from '@angular/common/http';
import { Injectable/*, NgZone*/ } from '@angular/core';

declare var google;

@Injectable()
export class GoogleMapProvider {
  service;
  autocompleteItems;
  map;
  marker;
  // autocomplete: any = {};
  
  constructor (
    // private zone: NgZone
  ) {
    this.autocompleteItems = [];
    // this.autocomplete = {query: ''};
  }
  
  loadMap(pos, element) {
    let latLng = new google.maps.LatLng(pos.latitude, pos.longitude);
    
    let mapOptions = { center: latLng, zoom: 10, disableDefaultUI: true, mapTypeId: google.maps.MapTypeId.ROADMAP }
    
    this.map = new google.maps.Map(element.nativeElement, mapOptions);

    return this.map;
  }
  
  search(addr: string) {
    this.service = new google.maps.places.AutocompleteService();
    let me = this;
    /*this.service.getPlacePredictions({ input: addr}, (predictions, status) => {
      me.autocompleteItems = [];
      me.zone.run(() => {
        if (predictions != null) {
          predictions.forEach(prediction => {
            me.autocompleteItems.push(prediction.description);
          });
        }
      });
    });*/
    
    return new Promise((resolve, reject) => {
      this.service.getPlacePredictions({ input: addr}, (predictions, status) => {
        me.autocompleteItems = [];
        if (predictions != null) {
          predictions.forEach(prediction => {
            me.autocompleteItems.push(prediction.description);
          });
          resolve(me.autocompleteItems);
        } else {
          reject();
        }
      });
    });
  }
  
  getLocation(address) {
    let geocoder = new google.maps.Geocoder();
    return new Promise((resolve) => {
      geocoder.geocode({ address: address }, (results, status) => {
        let pos = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
        resolve(pos);
      });
    });
  }

  setCenter(pos) {
    this.map.setCenter(pos);
  }

  setMap(map) {
    this.map = map;
  }

  addMarker(position, addr) {
    this.setCenter(position);

    if (this.marker) {
      this.marker.setMap(null);
    }

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });
    
    let infoWindow = new google.maps.InfoWindow({content: addr});

    google.maps.event.addListener(this.marker, 'click', () => {
      infoWindow.open(this.map, this.marker);
    });
  }

  redraw() {
    google.maps.event.trigger(this.map, 'resize');
    console.log(this.map);
  }
  
}
