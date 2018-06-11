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
  title = {featured: "Featured Businesses", most: "Most Popular", new: "New"};
  kind;
  lists: any;
  
  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private http: HttpProvider,
    private storage: Storage,
    private loadingCtrl: LoadingController
  ) {
    this.kind = this.navParams.get("kind");
    this.getCategoryList();
  }
  
  getCategoryList() {
    this.lists = [];
    this.storage.get("userInfo").then((data) => {
      this.http.getAllCompanies({kind: this.kind, limit: "-1", email: data.user_email}).then((value: any) => {
        let lists = value.list;
        // console.log(lists["1"]);

        for (let i = 0; i < lists.length; i += 2) {
          let obj = [];
          let objA = lists[i.toString()];
          console.log(objA);
          objA.image_url = this.http.SITE + "/uploads/" + objA.title + "_image.png";
          obj.push(objA);

          if (i + 1 != lists.length) {
            let objB = lists[(i + 1).toString()];
            objB.image_url = this.http.SITE + "/uploads/" + objB.title + "_image.png";
            obj.push(objB);
          }
          this.lists.push(obj);
        }

        console.log(this.lists);
      });
    });
  }
  
  goToCompanyProfilePage(id) {
    let modal = this.modalCtrl.create(CompanyProfilePage, {company_id: id});
    modal.present();
  }
  
  goToCategoryPage() {
    this.navCtrl.popTo(CategoryPage);
  }
  
  goBack() {
    this.navCtrl.pop();
  }
}
