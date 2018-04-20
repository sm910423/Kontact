import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-whats-on-details',
  templateUrl: 'whats-on-details.html',
})
export class WhatsOnDetailsPage {

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  goToBack() {
    this.navCtrl.pop();
  }
}
