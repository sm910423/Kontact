import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { GlobalProvider } from '../../providers/global/global';
import { CategoryListingPage } from '../category-listing/category-listing';

@Component({
  selector: 'page-sub-category',
  templateUrl: 'sub-category.html',
})
export class SubCategoryPage {
  category: any;
  index;
  category_image = "";
  subCategories: any;

  
  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private http: HttpProvider,
    private global: GlobalProvider
  ) {
    this.category = navParams.get("category");
    this.index = navParams.get("index");
    if (this.index < 9) {
      this.category_image = this.http.SITE + "/uploads/category_0" + (this.index + 1).toString() + ".png";
    } else {
      this.category_image = this.http.SITE + "/uploads/category_" + (this.index + 1).toString() + ".png";
    }
    
    this.getSubCategories(this.category);
  }
  
  getSubCategories(category) {
    this.subCategories = [];
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.getDataByPost(this.http.SUBCATEGORIES, {email: this.global.user_email, category_id: category.id}).then((values: any) => {
      this.subCategories = values.subcategories;
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
    });
  }
  
  goToCategoryListPage(subCategory, index) {
    this.navCtrl.push(CategoryListingPage, {category: this.category, sub_category: subCategory, ctg_index: this.index, sub_index: index});
  }

  goToBack() {
    this.navCtrl.pop();
  }
  
}
