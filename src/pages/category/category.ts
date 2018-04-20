import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { SubCategoryPage } from '../sub-category/sub-category';
import { CategoryListingPage } from '../category-listing/category-listing';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  categories:any;
  subCategories: any;

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController
  ) {
    this.categories = ["Featured Businesses", "Most Popular Businesses", "New"];
    this.subCategories = [
      { icon: "fa-user", title: "Accounting" },
      { icon: "fa-car", title: "Automative/Cars" },
      { icon: "fa-male", title: "Aged Care" },
      { icon: "fa-asterisk", title: "Architects" },
      { icon: "fa-gavel", title: "Artists" },
      { icon: "fa-building", title: "Building Supplies" },
      { icon: "fa-id-card", title: "Carpet" }
    ];
  }

  goToCategoryListingPage(title) {
    // this.navCtrl.push(CategoryListingPage, {title: title});
    let categoryListingModal = this.modalCtrl.create(CategoryListingPage, {title: title});
    categoryListingModal.onDidDismiss(data => {
      console.log(data);
    });
    categoryListingModal.present();
  }

  goToSubCategoryPage(sub) {
    // this.navCtrl.push(SubCategoryPage, {subCategory: sub});
    let subCategoryModal = this.modalCtrl.create(SubCategoryPage, {subCategory: sub});
    subCategoryModal.onDidDismiss(data => {
      console.log(data);
    });
    subCategoryModal.present();
  }

  closePage() {
    let data = {};
    this.viewCtrl.dismiss(data);
  }

}
