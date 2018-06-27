import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CategoryPage } from '../category/category';
import { CompanyProfilePage } from '../company-profile/company-profile';
import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'page-category-listing',
  templateUrl: 'category-listing.html',
})
export class CategoryListingPage {
  kinds = {featured: "Featured Businesses", most: "Most Popular", new: "New"};
  title;
  kind;
  lists: any;
  category;
  sub_category;
  
  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private http: HttpProvider,
    private storage: Storage,
    private loadingCtrl: LoadingController
  ) {
    this.kind = this.navParams.get("kind");
    if (this.kind) {
      this.title = this.kinds[this.kind];
    } else {
      this.category = this.navParams.get("category");
      this.sub_category = this.navParams.get("sub_category");
      this.title = this.category.title + " -> " + this.sub_category.title;
    }
    this.getList();
  }
  
  getList() {
    this.lists = [];
    this.storage.get("userInfo").then((data) => {
      let loading = this.loadingCtrl.create();
      loading.present();
      let json;
      if (this.kind) {
        json = {kind: this.kind, limit: "-1", email: data.user_email};
      } else {
        json = {email: data.user_email, sub_category_id: this.sub_category.id}
      }
      this.http.getDataByPost(this.http.COMPANY_LIST, json).then((value: any) => {
        let lists = value.list;
        
        for (let i = 0; i < lists.length; i += 2) {
          let obj = [];
          let objA = lists[i.toString()];
          objA.image_url = this.http.SITE + "/uploads/" + objA.title + "_image.png";
          obj.push(objA);
          
          if (i + 1 != lists.length) {
            let objB = lists[(i + 1).toString()];
            objB.image_url = this.http.SITE + "/uploads/" + objB.title + "_image.png";
            obj.push(objB);
          }
          this.lists.push(obj);
        }
        
        loading.dismiss();
      }).catch(() => {
        loading.dismiss();
      });
    });
  }
  
  goToCompanyProfilePage(id) {
    let modal = this.modalCtrl.create(CompanyProfilePage, {company_id: id});
    modal.present();
  }
  
  goToCategoryPage() {
    if (this.kind) {
      let categoryModal = this.modalCtrl.create(CategoryPage);
      categoryModal.present();
    } else {
      this.navCtrl.pop();
    }
  }
  
  goBack() {
    this.navCtrl.pop();
  }
}
