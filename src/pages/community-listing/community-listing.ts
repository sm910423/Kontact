import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, LoadingController, MenuController } from 'ionic-angular';
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
    this.http.getDataByPost(this.http.COMMUNITY_LIST, {kind: this.kind, limit: "-1", email: this.global.user_email}).then((value: any) => {
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
    }).catch(() => {
      loading.dismiss();
    });
  }
  
  goToBack() {
    // this.viewCtrl.dismiss();
    this.navCtrl.pop();
  }
  
  showMenu() {
    this.menuCtrl.open();
  }
  
  goToCommunityViewPage(id) {
    // let viewModal = this.modalCtrl.create(CommunityViewPage, {community_id: id});
    // viewModal.present();
    this.navCtrl.push(CommunityViewPage, {community_id: id});
  }
  
}
