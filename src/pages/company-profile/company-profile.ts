import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WebsitePage } from '../website/website';
import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'page-company-profile',
  templateUrl: 'company-profile.html',
})
export class CompanyProfilePage {
  company_id;
  company;
  segments = "en";

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private http: HttpProvider
  ) {
    this.company_id = this.navParams.get("company_id");
    this.getCompanyInfo();
  }

  getCompanyInfo() {
    this.company = {};
    let loading = this.loadingCtrl.create();

    loading.present();
    this.storage.get("userInfo").then((info) => {
      let json = {email: info.user_email, id: this.company_id};
      this.http.getDataByPost(this.http.COMPANY, json).then((data: any) => {
        loading.dismiss();
        this.company = data.info;
        this.company.image_url = this.http.SITE + "/uploads/" + this.company.title + "_image.png";
      }).catch(() => {
        loading.dismiss();
      });
    });
  }

  goToWebsitePage() {
    let modal = this.modalCtrl.create(WebsitePage);
    modal.onDidDismiss(data => {
    });
    modal.present();
  }

  goToBack() {
    this.navCtrl.pop();
  }

}
