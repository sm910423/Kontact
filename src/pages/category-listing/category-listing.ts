import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CompanyProfilePage } from '../company-profile/company-profile';
import { HttpProvider } from '../../providers/http/http';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-category-listing',
  templateUrl: 'category-listing.html',
})
export class CategoryListingPage {
  kinds = {featured: "Featured Businesses", most: "Most Popular", new: "New"};
  title;
  kind;
  lists: any;
  sub_category;
  sub_category_image;
  
  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HttpProvider,
    private loadingCtrl: LoadingController,
    private global: GlobalProvider
  ) {
    this.kind = this.navParams.get("kind");
    if (this.kind) {
      this.title = this.kinds[this.kind];
    } else {
      this.sub_category = this.navParams.get("sub_category");
      this.title = this.sub_category.title;
      let ctg_index = this.navParams.get("ctg_index");
      let sub_index = this.navParams.get("sub_index");
      let ctg_index_str = ((ctg_index < 9) ? "0" : "") + (ctg_index + 1).toString();
      let sub_index_str = ((sub_index < 9) ? "0" : "") + (sub_index + 1).toString();
      this.sub_category_image = this.http.SITE + "/uploads/category_" + ctg_index_str + "_" + sub_index_str + ".png";
    }
    this.getList();
  }
  
  getList() {
    this.lists = [];
    let loading = this.loadingCtrl.create();
    loading.present();
    let json;
    if (this.kind) {
      json = {kind: this.kind, limit: "-1", email: this.global.user_email};
    } else {
      json = {email: this.global.user_email, sub_category_id: this.sub_category.id}
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
  }
  
  goToCompanyProfilePage(id) {
    this.navCtrl.push(CompanyProfilePage, {company_id: id});
  }
  
  /*goToCategoryPage() {
    if (this.kind) {
      let categoryModal = this.modalCtrl.create(CategoryPage);
      categoryModal.present();
    } else {
      this.navCtrl.pop();
    }
  }*/
  
  goToBack() {
    this.navCtrl.pop();
  }
}
