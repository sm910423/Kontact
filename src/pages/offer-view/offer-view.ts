import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { GlobalProvider } from '../../providers/global/global';
import moment from 'moment';

@Component({
  selector: 'page-offer-view',
  templateUrl: 'offer-view.html',
})
export class OfferViewPage {
  offer;

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private global: GlobalProvider
  ) {
    let id = this.navParams.get("offer_id");
    this.getData(id);
  }
  
  getData(id) {
    this.offer = {};
    let loading = this.loadingCtrl.create();
    
    loading.present();
    let json = {email: this.global.user_email, id: id};
    this.http.getDataByPost(this.http.OFFER, json).then((data: any) => {
      loading.dismiss();
      this.offer = data.info;
      this.offer.content_de = this.global.convertAnchorToButton(atob(this.offer.content));
      let st = this.offer.created.split(" ").join("T");
      this.offer.created_str = moment(st).format("DD-MMM-YYYY");
      this.offer.image_url = this.http.SITE + "/uploads/" + this.offer.image;
      this.setContents();
    }).catch(() => {
      loading.dismiss();
    });
  }

  setContents() {
    setTimeout(() => {
      let element = document.getElementById("community-content");
      if (element) {
        element.innerHTML = this.offer.content_de;
      }
    }, 100);
  }
  
  goToBack() {
    this.navCtrl.pop();
  }

}
