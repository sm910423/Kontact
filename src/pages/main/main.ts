import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, AlertController, App, ModalController, Events } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpProvider } from '../../providers/http/http';
import { MessageProvider } from '../../providers/message/message';
import { CategoryPage } from '../category/category';
import { CategoryListingPage } from '../category-listing/category-listing';
import { CompanyProfilePage } from '../company-profile/company-profile';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  refresher: any;
  loading: any;
  mostList: any = [];
  featuredList: any = [];
  newList: any = [];
  limit = 5;
  totalCallCount = 3;
  didCallCount = 0;
  
  constructor (
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public storage: Storage,
    public httpProvider: HttpProvider,
    public messageProvider: MessageProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public app: App,
    public onesignal: OneSignal,
    public events: Events
  ) {
    /*this.platform.ready().then(() => {
      if (this.platform.is('ios') || this.platform.is('android')) {
        this.onesignal.startInit('3da23f43-b4e4-49c6-8ada-6e8b8452602e', '93392192219');
        this.onesignal.inFocusDisplaying(this.onesignal.OSInFocusDisplayOption.None);
        // this.onesignal.inFocusDisplaying(this.onesignal.OSInFocusDisplayOption.InAppAlert);
        this.onesignal.handleNotificationReceived().subscribe((msg) => {
          let msgStr: string = msg.payload.body;
          this.messageProvider.showMessage(msgStr);
        });
        this.onesignal.handleNotificationOpened().subscribe(() => {
          // this.reloadThreads(null);
        });
        this.onesignal.endInit();
      }
    });*/

    this.events.subscribe('company:http_call_end', () => {
      this.didCallCount ++;
      if (this.totalCallCount === this.didCallCount) {
        this.loading.dismiss();
      }
    });
    this.getData();
  }

  getData() {
    this.newList = this.featuredList = this.mostList = [];
    this.didCallCount = 0;
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    
    this.storage.get("userInfo").then((data) => {
      this.httpProvider.getDataByPost(this.httpProvider.COMPANY_LIST, {kind: "most", email: data.user_email, limit: this.limit}).then((value: any) => {
        this.mostList = value.list;
        this.mostList.forEach(element => {
          element.image_url = this.httpProvider.SITE + "/uploads/" + element.title + "_image.png";
        });
        this.events.publish('company:http_call_end');
      }).catch(() => {
        this.events.publish('company:http_call_end');
      });

      this.httpProvider.getDataByPost(this.httpProvider.COMPANY_LIST, {kind: "featured", email: data.user_email, limit: this.limit}).then((value: any) => {
        this.featuredList = value.list;
        this.featuredList.forEach(element => {
          element.image_url = this.httpProvider.SITE + "/uploads/" + element.title + "_image.png";
        });
        this.events.publish('company:http_call_end');
      }).catch(() => {
        this.events.publish('company:http_call_end');
      });

      this.httpProvider.getDataByPost(this.httpProvider.COMPANY_LIST, {kind: "new", email: data.user_email, limit: this.limit}).then((value: any) => {
        this.newList = value.list;
        this.newList.forEach(element => {
          element.image_url = this.httpProvider.SITE + "/uploads/" + element.title + "_image.png";
        });
        this.events.publish('company:http_call_end');
      }).catch(() => {
        this.events.publish('company:http_call_end');
      });
    });
  }
  
  updateData() {
  }
  
  doRefresh(event) {
    this.refresher = event;
    this.doRefreshComplete();
  }
  
  doRefreshComplete() {
    if (this.refresher != undefined && this.refresher != null) {
      this.refresher.complete();
      this.refresher = undefined;
    }
  }
  
  showMenu() {
    this.menuCtrl.open();
  }
  
  goToCategoryListingPage(kind) {
    let categoryModal = this.modalCtrl.create(CategoryListingPage, {kind: kind});
    categoryModal.present();
  }
  
  goToCompanyProfilePage(id) {
    let modal = this.modalCtrl.create(CompanyProfilePage, {company_id: id});
    modal.present();
  }
  
  goToCategoryPage() {
    let categoryModal = this.modalCtrl.create(CategoryPage);
    categoryModal.present();
  }
  
}
