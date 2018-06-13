import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { SubCategoryPage } from '../sub-category/sub-category';
import { CategoryListingPage } from '../category-listing/category-listing';
import { HttpProvider } from '../../providers/http/http';
import { Storage } from '@ionic/storage';

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
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private http: HttpProvider,
    private storage: Storage
  ) {
    this.kinds = [{title: "Featured Businesses", kind: "featured"}, {title: "Most Popular Businesses", kind: "most"}, {title: "New", kind: "new"}];

    this.getCategories();
  }

  getCategories() {
    this.categories = [];
    this.storage.get("userInfo").then((data) => {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.http.getDataByPost(this.http.CATEGORIES, {email: data.user_email}).then((values: any) => {
        this.categories = values.categories;
        loading.dismiss();
      }).catch(() => {
        loading.dismiss();
      });
    });
  }
  
  goToCategoryListingPage(kind) {
    let categoryModal = this.modalCtrl.create(CategoryListingPage, {kind: kind});
    categoryModal.present();
  }

  goToSubCategoryPage(category) {
    let subCategoryModal = this.modalCtrl.create(SubCategoryPage, {category: category});
    subCategoryModal.present();
  }

  closePage() {
    let data = {};
    this.viewCtrl.dismiss(data);
  }

}
