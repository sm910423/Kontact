import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Storage } from '@ionic/storage';
import { CategoryListingPage } from '../category-listing/category-listing';

@Component({
  selector: 'page-sub-category',
  templateUrl: 'sub-category.html',
})
export class SubCategoryPage {
  category: any;
  subCategories: any;

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private http: HttpProvider,
    private storage: Storage
  ) {
    this.category = navParams.get("category");
    this.getSubCategories(this.category);
  }

  getSubCategories(category) {
    this.subCategories = [];
    this.storage.get("userInfo").then((data) => {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.http.getDataByPost(this.http.SUBCATEGORIES, {email: data.user_email, category_id: category.id}).then((values: any) => {
        this.subCategories = values.subcategories;
        loading.dismiss();
      }).catch(() => {
        loading.dismiss();
      });
    });
  }

  goToCategoryListPage(subCategory) {
    let modal = this.modalCtrl.create(CategoryListingPage, {category: this.category, sub_category: subCategory});
    modal.present();
  }

  closePage() {
    this.viewCtrl.dismiss();
  }

}
