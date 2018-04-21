import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { CompanyProfilePage } from '../company-profile/company-profile';

@Component({
  selector: 'page-category-listing',
  templateUrl: 'category-listing.html',
})
export class CategoryListingPage {
  title: string;
  lists: any;

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.title = this.navParams.get("title");
    this.lists = [
      [{url: "./assets/images/item1.jpg"}, {url: "./assets/images/item1.jpg"}],
      [{url: "./assets/images/item2.jpg"}, {url: "./assets/images/item1.jpg"}],
      [{url: "./assets/images/item2.jpg"}, {url: "./assets/images/item2.jpg"}],
      [{url: "./assets/images/item1.jpg"}, {url: "./assets/images/item2.jpg"}],
      [{url: "./assets/images/item1.jpg"}, {url: "./assets/images/item1.jpg"}],
    ];
  }

  goToCompanyProfilePage() {
    let modal = this.modalCtrl.create(CompanyProfilePage);
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

  goToCategoryPage() {
    this.navCtrl.popTo(CategoryPage);
  }

  goBack() {
    this.navCtrl.pop();
  }
}
