import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { HttpProvider } from '../../providers/http/http';
import { MessageProvider } from '../../providers/message/message';
import { GlobalProvider } from '../../providers/global/global';

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
    private global: GlobalProvider
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
    }).catch(() => {
      loading.dismiss();
    });
  }
  
  goToBack() {
    this.navCtrl.pop();
  }
}
