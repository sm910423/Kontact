import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, AlertController, App, ModalController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpProvider } from '../../providers/http/http';
import { MessageProvider } from '../../providers/message/message';
import { CategoryPage } from '../category/category';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  refresher: any;
  loading: any;
  
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
  ) {
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

  showViewAll(index) {
    alert(index.toString());
  }

  goToCategoryPage() {
    // this.navCtrl.push(CategoryPage);
    let categoryModal = this.modalCtrl.create(CategoryPage);
    categoryModal.onDidDismiss(data => {
      console.log(data);
    });
    categoryModal.present();
  }
  
}
