import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-sub-category',
  templateUrl: 'sub-category.html',
})
export class SubCategoryPage {
  title: string;
  subCategories: any;

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    let item = navParams.get("subCategory");
    this.title = item ? item.title : "NONE";
    this.subCategories = [
      { icon: "fa-user", title: "Bookkeeper" },
      { icon: "fa-car", title: "General Accountants" },
      { icon: "fa-male", title: "Tax Accountant" }
    ];
  }

  closePage() {
    this.viewCtrl.dismiss();
  }

}
