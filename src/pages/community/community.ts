import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CommunityListingPage } from '../community-listing/community-listing';
import { CommunityViewPage } from '../community-view/community-view';

@Component({
  selector: 'page-community',
  templateUrl: 'community.html',
})
export class CommunityPage {
  images: any;

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
  ) {
    this.images = [
      {src: "./assets/images/item3.jpg", title: "Featured Business", location: "Poland"},
      {src: "./assets/images/item5.jpg", title: "New", location: "Poland"},
      {src: "./assets/images/item5.jpg", title: "Most Popular", location: "Poland"},
    ];
  }

  goToCommunityListingPage() {
    let listingModal = this.modalCtrl.create(CommunityListingPage);
    listingModal.onDidDismiss(data => {
      console.log(data);
    });
    listingModal.present();
  }

  goToCommunityViewPage() {
    let viewModal = this.modalCtrl.create(CommunityViewPage);
    viewModal.onDidDismiss(data => {
      console.log(data);
    });
    viewModal.present();
  }

}
