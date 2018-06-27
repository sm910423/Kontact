import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {
  sub_title = "";
  content = "";
  image_src = "";
  
  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private http: HttpProvider,
    private storage: Storage
  ) {
    this.getData();
  }
  
  getData() {
    this.sub_title = "";
    this.content = "";
    this.image_src = "";
    this.storage.get("userInfo").then((data) => {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.http.getDataByPost(this.http.ABOUT, {email: data.user_email}).then((value: any) => {
        loading.dismiss();
        if (value.info) {
          this.sub_title = value.info.title;
          this.content = value.info.content;
          this.image_src = this.http.SITE + "/uploads/aboutus.png";
        }
      }).catch(() => {
        loading.dismiss();
      });
    });
  }
  
  goToBack() {
    this.navCtrl.pop();
  }
}
