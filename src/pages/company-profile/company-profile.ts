import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController/*, Events*/ } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-company-profile',
  templateUrl: 'company-profile.html',
})
export class CompanyProfilePage {
  company_id;
  company;
  segments = "en";
  category_title = "";
  sub_category_title = "";
  
  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private http: HttpProvider,
    // private events: Events,
    private callNumber: CallNumber,
    private iab: InAppBrowser,
    private emailComposer: EmailComposer,
    private global: GlobalProvider
  ) {
    this.company_id = this.navParams.get("company_id");
    this.getCompanyInfo();
    
    // this.events.subscribe("logo-loaded", () => {
    //   setTimeout(() => {
    //     let box = document.getElementsByClassName("logo-image-box")[0];
    //     let box_height = box.scrollHeight;
    
    //     let logo = document.getElementById("logo-image");
    //     let logo_width = logo.scrollWidth;
    //     let logo_height = logo.scrollHeight;
    //     let logo_ratio = logo_width / logo_height;
    //     logo_height = box_height / 4;
    //     logo_width = logo_height * logo_ratio;
    //     logo.setAttribute("width", logo_width.toString());
    //     logo.setAttribute("height", logo_height.toString());
    //   }, 50);
    // }); 
  }
  
  ionViewWillLeave() {
    // this.events.unsubscribe("logo-loaded");
  }
  
  getCompanyInfo() {
    this.company = {};
    this.category_title = "";
    this.sub_category_title = "";
    let loading = this.loadingCtrl.create();
    
    loading.present();
    let json = {email: this.global.user_email, id: this.company_id};
    this.http.getDataByPost(this.http.COMPANY, json).then((data: any) => {
      loading.dismiss();
      this.company = data.info;
      // this.company.services_en_arr = this.company.services_en.split('\n');
      // this.company.services_en_arr = this.company.services_en_arr.filter(element => element.length > 1);
      // this.company.services_rn_arr = this.company.services_rn.split('\n');
      // this.company.services_rn_arr = this.company.services_rn_arr.filter(element => element.length > 1);
      // this.company.about_en_arr = this.company.about_en.split('\n');
      // this.company.about_en_arr = this.company.about_en_arr.filter(element => element.length > 1);
      // this.company.about_rn_arr = this.company.about_rn.split('\n');
      // this.company.about_rn_arr = this.company.about_rn_arr.filter(element => element.length > 1);
      // this.company.contacts_en_arr = this.company.contacts_en.split('\n');
      // this.company.contacts_en_arr = this.company.contacts_en_arr.filter(element => element.length > 1);
      // this.company.contacts_rn_arr = this.company.contacts_rn.split('\n');
      // this.company.contacts_rn_arr = this.company.contacts_rn_arr.filter(element => element.length > 1);
      this.company.services_en_de = atob(this.company.services_en);
      this.company.about_en_de = atob(this.company.about_en);
      this.company.contacts_en_de = atob(this.company.contacts_en);
      this.company.services_rn_de = atob(this.company.services_rn);
      this.company.about_rn_de = atob(this.company.about_rn);
      this.company.contacts_rn_de = atob(this.company.contacts_rn);
      this.company.image_url = this.http.SITE + "/uploads/" + this.company.title + "_image.png";
      this.company.logo_url = this.http.SITE + "/uploads/" + this.company.title + "_logo.png";
      
      this.setTitleColor();
      this.setContents();
      // this.events.publish("logo-loaded");
      
      let category: any = this.global.categories.filter(category => category.id == this.company.category_id);
      if (category && category.length > 0) {
        this.category_title = category[0].title;
        let sub_category: any = category[0].sub_categories.filter(sub_category => sub_category.id == this.company.sub_category_id);
        if (sub_category && sub_category.length > 0) {
          this.sub_category_title = sub_category[0].title;
        }
      }
    }).catch(() => {
      loading.dismiss();
    });
  }
  
  setTitleColor() {
    setTimeout(() => {
      // this.company.title_color = "#000000";
      if (this.company.title_color) {
        this.company.title_color = ((this.company.title_color.substr(0, 1) != "#") ? "#" : "") + this.company.title_color;
        document.getElementById("title-box").style["color"] = this.company.title_color;
      }
    }, 100);
  }

  setContents() {
    setTimeout(() => {
      let element = document.getElementById("services_en");
      if (element) {
        element.innerHTML = this.company.services_en_de;
      }
      element = document.getElementById("about_en");
      if (element) {
        element.innerHTML = this.company.about_en_de;
      }
      element = document.getElementById("contacts_en");
      if (element) {
        element.innerHTML = this.company.contacts_en_de;
      }
      element = document.getElementById("services_rn");
      if (element) {
        element.innerHTML = this.company.services_rn_de;
      }
      element = document.getElementById("about_rn");
      if (element) {
        element.innerHTML = this.company.about_rn_de;
      }
      element = document.getElementById("contacts_rn");
      if (element) {
        element.innerHTML = this.company.contacts_rn_de;
      }
    }, 100);
  }

  convertAnchorToButton(str: string) {
    str.replace(/<a /g, "<button ion-button clear (click)='goExternalSite(this)' ");
    str.replace(/<\/a>/g, "</button>");
  }
  
  callPhone(num) {
    this.callNumber.callNumber(num, true).then((res) => {
      console.log("Launched dialer!", res);
      this.updateProfile();
    }).catch((err) => console.log("Error launching dialer", err));
  }
  
  updateProfile() {
    let json = {email: this.global.user_email, id: this.company_id};
    this.http.getDataByPost(this.http.COMPANY_UPDATE, json).then(() => {
      
    }).catch(() => {
      
    });
  }
  
  goToWebsitePage(url) {
    const browser = this.iab.create(url);
    browser.show();
  }
  
  async goToEmailPage(email_address) {
    let permission = await this.emailComposer.requestPermission();
    if (permission) {
      let email = {
        to: email_address,
        // cc: email_address,
        // bcc: ['john@doe.com', 'jane@doe.com'],
        // attachments: [
        //   'file://img/logo.png',
        //   'res://icon.png',
        //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        //   'file://README.pdf'
        // ],
        // subject: 'Cordova Icons',
        // body: 'How are you? Nice greetings from Leipzig',
        isHtml: true
      };
      
      this.emailComposer.open(email);
    }
  }
  
  goToBack() {
    this.navCtrl.pop();
  }
  
}
