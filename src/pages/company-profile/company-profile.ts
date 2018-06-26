import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { WebsitePage } from '../website/website';
import { HttpProvider } from '../../providers/http/http';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
    private http: HttpProvider,
    private events: Events,
    private callNumber: CallNumber,
    private iab: InAppBrowser
  ) {
    this.company_id = this.navParams.get("company_id");
    this.getCompanyInfo();
    this.events.subscribe("logo-loaded", () => {
      setTimeout(() => {
        let box = document.getElementsByClassName("logo-image-box")[0];
        let box_height = box.scrollHeight;
        
        let logo = document.getElementById("logo-image");
        let logo_width = logo.scrollWidth;
        let logo_height = logo.scrollHeight;
        let logo_ratio = logo_width / logo_height;
        logo_height = box_height / 4;
        logo_width = logo_height * logo_ratio;
        logo.setAttribute("width", logo_width.toString());
        logo.setAttribute("height", logo_height.toString());
      }, 50);
    });
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
        this.company.logo_url = this.http.SITE + "/uploads/" + this.company.title + "_logo.png";
        this.events.publish("logo-loaded");
      }).catch(() => {
        loading.dismiss();
      });
    });
  }
  
  ionViewDidEnter() {
  }
  
  callPhone(num) {
    this.callNumber.callNumber(num, true).then((res) => {
        console.log("Launched dialer!", res);
        this.updateProfile();
      }).catch((err) => console.log("Error launching dialer", err));
  }

  updateProfile() {
    this.storage.get("userInfo").then((info) => {
      let json = {email: info.user_email, id: this.company_id};
      this.http.getDataByPost(this.http.COMPANY_UPDATE, json).then(() => {

      }).catch(() => {

      });
    });
  }
  
  ionViewWillLeave() {
    this.events.unsubscribe("logo-loaded");
  }
  
  goToWebsitePage(url) {
    // let modal = this.modalCtrl.create(WebsitePage);
    // modal.present();
    const browser = this.iab.create(url);
    browser.show();
  }
  
  goToBack() {
    this.navCtrl.pop();
  }
  
}
