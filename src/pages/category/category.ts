import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { SubCategoryPage } from '../sub-category/sub-category';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  subCategories: any;

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController
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
