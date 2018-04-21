import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { WebsitePage } from '../website/website';

@Component({
  selector: 'page-company-profile',
  templateUrl: 'company-profile.html',
})
export class CompanyProfilePage {
  segments = "en";

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
  }

  goToWebsitePage() {
    let modal = this.modalCtrl.create(WebsitePage);
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

  goToBack() {
    this.navCtrl.pop();
  }

}
