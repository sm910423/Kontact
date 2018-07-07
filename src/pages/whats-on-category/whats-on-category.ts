import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { WhatsOnDetailsPage } from '../whats-on-details/whats-on-details';
import { HttpProvider } from '../../providers/http/http';
import { GlobalProvider } from '../../providers/global/global';

import moment from 'moment';

@Component({
  selector: 'page-whats-on-category',
  templateUrl: 'whats-on-category.html',
})
export class WhatsOnCategoryPage {
  title = {featured: "Featured Businesses", most: "Most Popular", new: "New"};
  kind;
  lists: any;
  
  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private global: GlobalProvider
  ) {
    // this.kind = this.navParams.get("kind");
    this.kind = 'new';
    this.getCategoryList();
  }
  
  getCategoryList() {
    this.lists = [];
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.getDataByPost(this.http.EVENT_LIST, {kind: this.kind, limit: "-1", email: this.global.user_email}).then((value: any) => {
      // let lists = value.list;
      
      /*for (let i = 0; i < lists.length; i += 2) {
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
      }*/
      
      this.lists = value.list;
      this.lists.forEach(event => {
        event.image_url = this.http.SITE + "/uploads/" + event.image;
        let st = event.time.split(" ").join("T");
        event.date_str = moment(st).format("DD-MMM-YYYY");
      });
      console.log(this.lists);

      setTimeout(() => {
        this.lists.forEach(event => {
          let id = "image-col-" + event.id;
          document.getElementById(id).style["background-image"]="url(" + event.image_url + ")";
        });
      }, 30);
      
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
    });
  }
  
  goToWhatsOnDetailsPage(id) {
    this.navCtrl.push(WhatsOnDetailsPage, {event_id: id});
  }
  
  goToBack() {
    this.navCtrl.pop();
  }
  
}
