import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-advertise',
  templateUrl: 'advertise.html',
})
export class AdvertisePage {

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  goToBack() {
    this.navCtrl.pop();
  }
  
}
