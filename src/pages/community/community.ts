import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Events } from 'ionic-angular';
import { CommunityListingPage } from '../community-listing/community-listing';
import { CommunityViewPage } from '../community-view/community-view';
import { HttpProvider } from '../../providers/http/http';
import { MessageProvider } from '../../providers/message/message';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-community',
  templateUrl: 'community.html',
})
export class CommunityPage {
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
    this.events.subscribe('community:http_call_end', () => {
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
      this.httpProvider.getDataByPost(this.httpProvider.COMMUNITY_LIST, {kind: "most", email: data.user_email, limit: this.limit}).then((value: any) => {
        this.mostList = value.list;
        this.mostList.forEach(element => {
          element.image_url = this.httpProvider.SITE + "/uploads/" + element.image;
        });
        this.events.publish('community:http_call_end');
      }).catch(() => {
        this.events.publish('community:http_call_end');
      });

      this.httpProvider.getDataByPost(this.httpProvider.COMMUNITY_LIST, {kind: "featured", email: data.user_email, limit: this.limit}).then((value: any) => {
        this.featuredList = value.list;
        this.featuredList.forEach(element => {
          element.image_url = this.httpProvider.SITE + "/uploads/" + element.image;
        });
        this.events.publish('community:http_call_end');
      }).catch(() => {
        this.events.publish('community:http_call_end');
      });

      this.httpProvider.getDataByPost(this.httpProvider.COMMUNITY_LIST, {kind: "new", email: data.user_email, limit: this.limit}).then((value: any) => {
        this.newList = value.list;
        this.newList.forEach(element => {
          element.image_url = this.httpProvider.SITE + "/uploads/" + element.image;
        });
        this.events.publish('community:http_call_end');
      }).catch(() => {
        this.events.publish('community:http_call_end');
      });
    });
  }

  goToCommunityListingPage() {
    let listingModal = this.modalCtrl.create(CommunityListingPage);
    listingModal.onDidDismiss(data => {
      console.log(data);
    });
    listingModal.present();
  }

  goToCommunityViewPage() {
    let viewModal = this.modalCtrl.create(CommunityViewPage);
    viewModal.onDidDismiss(data => {
      console.log(data);
    });
    viewModal.present();
  }

  ionViewWillLeave() {
    this.events.unsubscribe("community:http_call_end");
  }

}
