import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { CommunityViewPage } from '../community-view/community-view';
import { HttpProvider } from '../../providers/http/http';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-community-listing',
  templateUrl: 'community-listing.html',
})
export class CommunityListingPage {
  title = {featured: "Featured Businesses", most: "Most Popular", new: "New"};
  kind;
  lists: any;
  
  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private global: GlobalProvider
  ) {
    this.kind = this.navParams.get("kind");
    this.getCategoryList();
  }
  
  getCategoryList() {
    this.lists = [];
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.getDataByPost(this.http.COMMUNITY_LIST, {kind: this.kind, limit: "-1", email: this.global.user_email}).then((value: any) => {
      this.lists = value.list;
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
    });
  }
  
  goToBack() {
    this.viewCtrl.dismiss();
  }
  
  goToCommunityViewPage(id) {
    let viewModal = this.modalCtrl.create(CommunityViewPage, {community_id: id});
    viewModal.present();
  }
  
}
