import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WhatsOnCategoryPage } from '../whats-on-category/whats-on-category';
import { WhatsOnDetailsPage } from '../whats-on-details/whats-on-details';
import { HttpProvider } from '../../providers/http/http';
import { MessageProvider } from '../../providers/message/message';

@Component({
  selector: 'page-whats-on',
  templateUrl: 'whats-on.html',
})
export class WhatsOnPage {
  newList;
  featuredList;
  mostList;
  limit = 5;
  totalCallCount = 3;
  didCallCount = 0;
  loading;
  
  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public httpProvider: HttpProvider,
    public messageProvider: MessageProvider,
    private loadingCtrl: LoadingController,
    private events: Events
  ) {
    this.getData();
    this.events.subscribe('event:http_call_end', () => {
      this.didCallCount ++;
      if (this.totalCallCount === this.didCallCount) {
        this.loading.dismiss();
      }
    });
  }

  getData() {
    this.newList = this.featuredList = this.mostList = [];
    this.didCallCount = 0;
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    
    this.storage.get("userInfo").then((data) => {
      this.httpProvider.getDataByPost(this.httpProvider.EVENT_LIST, {kind: "most", email: data.user_email, limit: this.limit}).then((value: any) => {
        this.mostList = value.list;
        this.mostList.forEach(element => {
          element.image_url = this.httpProvider.SITE + "/uploads/" + element.image;
        });
        this.events.publish('event:http_call_end');
      }).catch(() => {
        this.events.publish('event:http_call_end');
      });

      this.httpProvider.getDataByPost(this.httpProvider.EVENT_LIST, {kind: "featured", email: data.user_email, limit: this.limit}).then((value: any) => {
        this.featuredList = value.list;
        this.featuredList.forEach(element => {
          element.image_url = this.httpProvider.SITE + "/uploads/" + element.image;
        });
        this.events.publish('event:http_call_end');
      }).catch(() => {
        this.events.publish('event:http_call_end');
      });

      this.httpProvider.getDataByPost(this.httpProvider.EVENT_LIST, {kind: "new", email: data.user_email, limit: this.limit}).then((value: any) => {
        this.newList = value.list;
        this.newList.forEach(element => {
          element.image_url = this.httpProvider.SITE + "/uploads/" + element.image;
        });
        this.events.publish('event:http_call_end');
      }).catch(() => {
        this.events.publish('event:http_call_end');
      });
    });
  }
  
  showViewAll(title) {
    let categoryModal = this.modalCtrl.create(WhatsOnCategoryPage, {kind: title});
    
    categoryModal.present();
  }

  goToWhatsOnDetailsPage(id) {
    let modal = this.modalCtrl.create(WhatsOnDetailsPage, {event_id: id});
    modal.present();
  }
  
}
