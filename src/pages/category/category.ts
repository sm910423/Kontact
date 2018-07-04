import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { SubCategoryPage } from '../sub-category/sub-category';
import { HttpProvider } from '../../providers/http/http';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  kinds:any;
  categories: any;
  
  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private http: HttpProvider,
    private global: GlobalProvider
  ) {
    this.kinds = [{title: "Featured Businesses", kind: "featured"}, {title: "Most Popular Businesses", kind: "most"}, {title: "New", kind: "new"}];
    
    this.getCategories();
  }
  
  getCategories() {
    this.categories = [];
    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.getDataByPost(this.http.CATEGORIES, {email: this.global.user_email}).then((values: any) => {
      this.categories = values.categories;
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
    });
  }
  
  goToSubCategoryPage(category, index) {
    this.navCtrl.push(SubCategoryPage, {category: category, index: index});
  }
  
  goToBack() {
    this.navCtrl.pop();
  }
  
}
