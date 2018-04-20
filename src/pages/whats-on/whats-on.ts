import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-whats-on',
  templateUrl: 'whats-on.html',
})
export class WhatsOnPage {

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

}
