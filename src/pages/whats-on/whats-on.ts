import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Events } from 'ionic-angular';

import { WhatsOnCategoryPage } from '../whats-on-category/whats-on-category';
import { WhatsOnDetailsPage } from '../whats-on-details/whats-on-details';
import { HttpProvider } from '../../providers/http/http';
import { MessageProvider } from '../../providers/message/message';
import { GlobalProvider } from '../../providers/global/global';

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
    private navCtrl: NavController, 
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private httpProvider: HttpProvider,
    private messageProvider: MessageProvider,
    private global: GlobalProvider,
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
    
      this.httpProvider.getDataByPost(this.httpProvider.EVENT_LIST, {kind: "most", email: this.global.user_email, limit: this.limit}).then((value: any) => {
        this.mostList = value.list;
        this.mostList.forEach(element => {
          element.image_url = this.httpProvider.SITE + "/uploads/" + element.image;
        });
        this.events.publish('event:http_call_end');
      }).catch(() => {
        this.events.publish('event:http_call_end');
      });

      this.httpProvider.getDataByPost(this.httpProvider.EVENT_LIST, {kind: "featured", email: this.global.user_email, limit: this.limit}).then((value: any) => {
        this.featuredList = value.list;
        this.featuredList.forEach(element => {
          element.image_url = this.httpProvider.SITE + "/uploads/" + element.image;
        });
        this.events.publish('event:http_call_end');
      }).catch(() => {
        this.events.publish('event:http_call_end');
      });

      this.httpProvider.getDataByPost(this.httpProvider.EVENT_LIST, {kind: "new", email: this.global.user_email, limit: this.limit}).then((value: any) => {
        this.newList = value.list;
        this.newList.forEach(element => {
          element.image_url = this.httpProvider.SITE + "/uploads/" + element.image;
        });
        this.events.publish('event:http_call_end');
      }).catch(() => {
        this.events.publish('event:http_call_end');
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

  ionViewWillLeave() {
    this.events.unsubscribe("event:http_call_end");
  }
  
}
