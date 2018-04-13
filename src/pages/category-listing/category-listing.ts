import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-category-listing',
  templateUrl: 'category-listing.html',
})
export class CategoryListingPage {

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

}
