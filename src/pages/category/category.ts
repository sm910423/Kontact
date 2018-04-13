import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  subCategories: any;

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
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

  closePage() {
    let data = {};
    this.viewCtrl.dismiss(data);
  }

}
