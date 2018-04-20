import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-community-listing',
  templateUrl: 'community-listing.html',
})
export class CommunityListingPage {

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  goToBack() {
    let data = {};
    this.viewCtrl.dismiss(data);
  }

}
