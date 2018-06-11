import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WhatsOnDetailsPage } from '../whats-on-details/whats-on-details';
import { HttpProvider } from '../../providers/http/http';

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
    private storage: Storage
  ) {
    this.kind = this.navParams.get("kind");
    this.getCategoryList();
  }
  
  getCategoryList() {
    this.lists = [];
    this.storage.get("userInfo").then((data) => {
      this.http.getAllEvents({kind: this.kind, limit: "-1", email: data.user_email}).then((value: any) => {
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
      });
    });
  }

  goToWhatsOnDetailsPage(id) {
    let modal = this.modalCtrl.create(WhatsOnDetailsPage, {event_id: id});
    modal.present();
  }

  goToBack() {
    this.navCtrl.pop();
  }

}
