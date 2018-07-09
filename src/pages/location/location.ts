import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleMapProvider } from '../../providers/google-map/google-map';

@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  @ViewChild('map') mapElement: ElementRef;
  address;

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    private googleMapProvider: GoogleMapProvider
  ) {
    this.address = this.navParams.get("address");
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.googleMapProvider.search(this.address).then((arrays) => {
      this.googleMapProvider.getLocation(arrays[0]).then(pos => {
        this.showMap(pos, arrays[0]);
      });
    }).catch((err) => {
      this.showMap({ lat: 43.333333, lng: 21.898852 }, "Nis, Serbia");
      console.log(err);
    });
  }

  showMap(pos, address) {
    this.googleMapProvider.loadMap(pos, this.mapElement);
    this.googleMapProvider.addMarker(pos, address);
  }

  goToBack() {
    this.navCtrl.pop();
  }

}
