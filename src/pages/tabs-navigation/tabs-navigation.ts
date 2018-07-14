import { Component, ViewChild } from '@angular/core';
import { MainPage } from '../main/main';
import { NavController, NavParams } from 'ionic-angular';
// import { CommunityPage } from '../community/community';
// import { WhatsOnPage } from '../whats-on/whats-on';
import { CommunityListingPage } from '../community-listing/community-listing';
import { WhatsOnCategoryPage } from '../whats-on-category/whats-on-category';
import { OfferListPage } from '../offer-list/offer-list';

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
    this.tab2Root = CommunityListingPage;
    this.tab3Root = WhatsOnCategoryPage;
    this.tab4Root = OfferListPage;
  }

  ionViewDidLoad() {
  }
}
