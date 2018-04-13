import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoryPage } from '../category/category';

@Component({
  selector: 'page-category-listing',
  templateUrl: 'category-listing.html',
})
export class CategoryListingPage {
  title: string;
  lists: any;

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams
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

  goToCategoryPage() {
    this.navCtrl.popTo(CategoryPage);
  }

  goBack() {
    this.navCtrl.pop();
  }
}
