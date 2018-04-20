import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { WhatsOnDetailsPage } from '../whats-on-details/whats-on-details';

@Component({
  selector: 'page-whats-on-category',
  templateUrl: 'whats-on-category.html',
})
export class WhatsOnCategoryPage {
  title: string;
  lists: any;

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.title = this.navParams.get("title");
    this.lists = [
      [{url: "./assets/images/item1.jpg", comment: "Good Event in Featured", date: "23.04.2018"}, {url: "./assets/images/item1.jpg", comment: "Good Event in Featured", date: "23.04.2018"}],
      [{url: "./assets/images/item2.jpg", comment: "Good Event in Featured", date: "23.04.2018"}, {url: "./assets/images/item1.jpg", comment: "Good Event in Featured", date: "23.04.2018"}],
      [{url: "./assets/images/item2.jpg", comment: "Good Event in Featured", date: "23.04.2018"}, {url: "./assets/images/item2.jpg", comment: "Good Event in Featured", date: "23.04.2018"}],
      [{url: "./assets/images/item1.jpg", comment: "Good Event in Featured", date: "23.04.2018"}, {url: "./assets/images/item2.jpg", comment: "Good Event in Featured", date: "23.04.2018"}],
      [{url: "./assets/images/item1.jpg", comment: "Good Event in Featured", date: "23.04.2018"}, {url: "./assets/images/item1.jpg", comment: "Good Event in Featured", date: "23.04.2018"}],
    ];
  }

  goToWhatsOnDetailsPage() {
    let modal = this.modalCtrl.create(WhatsOnDetailsPage);
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

  goToBack() {
    this.navCtrl.pop();
  }

}
