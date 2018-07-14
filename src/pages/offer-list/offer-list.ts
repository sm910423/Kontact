import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, LoadingController, MenuController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { GlobalProvider } from '../../providers/global/global';
import { OfferViewPage } from '../offer-view/offer-view';

@Component({
  selector: 'page-offer-list',
  templateUrl: 'offer-list.html',
})
export class OfferListPage {
  title = {featured: "Featured Businesses", most: "Most Popular", new: "New"};
  kind;
  lists: any;
  refresher: any;

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private global: GlobalProvider,
    private menuCtrl: MenuController
  ) {
    // this.kind = this.navParams.get("kind");
    this.kind = 'new';
    this.getCategoryList();
  }
  
  getCategoryList() {
    this.lists = [];
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.getDataByPost(this.http.OFFER_LIST, {kind: this.kind, limit: "-1", email: this.global.user_email}).then((value: any) => {
      let lists = value.list;

      for (let i = 0; i < lists.length; i += 2) {
        let obj = [];
        let objA = lists[i.toString()];
        objA.image_url = this.http.SITE + "/uploads/" + objA.image;
        obj.push(objA);
        
        if (i + 1 != lists.length) {
          let objB = lists[(i + 1).toString()];
          objB.image_url = this.http.SITE + "/uploads/" + objB.image;
          obj.push(objB);
        }
        this.lists.push(obj);
      }

      loading.dismiss();
      this.doRefreshComplete();
    }).catch(() => {
      loading.dismiss();
      this.doRefreshComplete();
    });
  }
  
  doRefresh(event) {
    this.refresher = event;
    this.getCategoryList();
  }
  
  doRefreshComplete() {
    if (this.refresher != undefined && this.refresher != null) {
      this.refresher.complete();
      this.refresher = undefined;
    }
  }
  
  goToBack() {
    // this.viewCtrl.dismiss();
    this.navCtrl.pop();
  }
  
  showMenu() {
    this.menuCtrl.open();
  }
  
  goToOfferViewPage(id) {
    this.navCtrl.push(OfferViewPage, {offer_id: id});
  }
}
