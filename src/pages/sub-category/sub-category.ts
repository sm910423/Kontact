import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { GlobalProvider } from '../../providers/global/global';
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
    private loadingCtrl: LoadingController,
    private http: HttpProvider,
    private global: GlobalProvider
  ) {
    this.category = navParams.get("category");
    this.category.image_url = this.http.SITE + "/uploads/" + this.category.picture;
    
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
  
  goToCategoryListPage(subCategory) {
    this.navCtrl.push(CategoryListingPage, {sub_category: subCategory});
  }

  goToBack() {
    this.navCtrl.pop();
  }
  
}
