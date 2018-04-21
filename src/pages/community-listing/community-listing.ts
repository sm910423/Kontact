import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { CommunityViewPage } from '../community-view/community-view';

@Component({
  selector: 'page-community-listing',
  templateUrl: 'community-listing.html',
})
export class CommunityListingPage {

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController
  ) {
  }

  goToBack() {
    let data = {};
    this.viewCtrl.dismiss(data);
  }
  
  goToCommunityViewPage() {
    let viewModal = this.modalCtrl.create(CommunityViewPage);
    viewModal.onDidDismiss(data => {
      console.log(data);
    });
    viewModal.present();
  }

}
