import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { WhatsOnCategoryPage } from '../whats-on-category/whats-on-category';
import { WhatsOnDetailsPage } from '../whats-on-details/whats-on-details';

@Component({
  selector: 'page-whats-on',
  templateUrl: 'whats-on.html',
})
export class WhatsOnPage {
  
  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
  }
  
  showViewAll(title) {
    let categoryModal = this.modalCtrl.create(WhatsOnCategoryPage, {title: title});
    categoryModal.onDidDismiss(data => {
      console.log(data);
    });
    categoryModal.present();
  }

  goToWhatsOnDetailsPage() {
    let modal = this.modalCtrl.create(WhatsOnDetailsPage);
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }
  
}
