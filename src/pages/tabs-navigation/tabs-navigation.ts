import { Component, ViewChild } from '@angular/core';
import { MainPage } from '../main/main';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'tabs-navigation',
  templateUrl: 'tabs-navigation.html'
})
export class TabsNavigationPage {
  @ViewChild('myTabs') tabRef: any;
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;

  constructor (
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.tab1Root = MainPage;
    this.tab2Root = MainPage;
    this.tab3Root = MainPage;
    this.tab4Root = MainPage;
  }

  ionViewDidLoad() {
  }
}
