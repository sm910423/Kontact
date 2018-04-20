import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-community-view',
  templateUrl: 'community-view.html',
})
export class CommunityViewPage {

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
