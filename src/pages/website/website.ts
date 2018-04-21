import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-website',
  templateUrl: 'website.html',
})
export class WebsitePage {
  segments = "about";

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  goToBack() {
    this.navCtrl.pop();
  }
}
