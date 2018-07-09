import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { HttpProvider } from '../../providers/http/http';
import { MessageProvider } from '../../providers/message/message';
import { GlobalProvider } from '../../providers/global/global';
import moment from 'moment';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-whats-on-details',
  templateUrl: 'whats-on-details.html',
})
export class WhatsOnDetailsPage {
  event_id;
  event;
  
  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private http: HttpProvider,
    private message: MessageProvider,
    private global: GlobalProvider,
    private iab: InAppBrowser,
  ) {
    this.event_id = this.navParams.get("event_id");
    this.getEventInfo();
  }
  
  getEventInfo() {
    this.event = {};
    let loading = this.loadingCtrl.create();
    
    loading.present();
    let json = {email: this.global.user_email, id: this.event_id};
    this.http.getDataByPost(this.http.EVENT, json).then((data: any) => {
      loading.dismiss();
      this.event = data.info;
      this.event.image_url = this.http.SITE + "/uploads/" + this.event.image;
      let st = this.event.time.split(" ").join("T");
      this.event.month_str = moment(st).format("MMM");
      this.event.day_str = moment(st).format("DD");
      this.event.date_str = moment(st).format("LLLL");
    }).catch(() => {
      loading.dismiss();
    });
  }
  
  goToBack() {
    this.navCtrl.pop();
  }
  
  goToWebsitePage(url) {
    const browser = this.iab.create(url);
    browser.show();
  }

  goToGoogleMapPage(address) {

  }
}
