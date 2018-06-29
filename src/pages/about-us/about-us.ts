import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { GlobalProvider } from '../../providers/global/global';

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
    private global: GlobalProvider
  ) {
    this.getData();
  }
  
  getData() {
    this.sub_title = "";
    this.content = "";
    this.image_src = "";
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.getDataByPost(this.http.ABOUT, {email: this.global.user_email}).then((value: any) => {
      loading.dismiss();
      if (value.info) {
        this.sub_title = value.info.title;
        this.content = value.info.content;
        this.image_src = this.http.SITE + "/uploads/aboutus.png";
      }
    });
  }
  
  goToBack() {
    this.navCtrl.pop();
  }
}
