import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-community-view',
  templateUrl: 'community-view.html',
})
export class CommunityViewPage {
  community;
  
  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private global: GlobalProvider
  ) {
    let id = this.navParams.get("community_id");
    this.getData(id);
  }
  
  getData(id) {
    this.community = {};
    let loading = this.loadingCtrl.create();
    
    loading.present();
    let json = {email: this.global.user_email, id: id};
    this.http.getDataByPost(this.http.COMMUNITY, json).then((data: any) => {
      loading.dismiss();
      this.community = data.info;
      this.community.image_url = this.http.SITE + "/uploads/" + this.community.image;
    }).catch(() => {
      loading.dismiss();
    });
  }
  
  goToBack() {
    let data = {};
    this.viewCtrl.dismiss(data);
  }
  
}
