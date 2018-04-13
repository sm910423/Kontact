import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-notification-b',
  templateUrl: 'notification-b.html',
})
export class NotificationBPage {

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  goToNextPage() {
    this.navCtrl.popTo(LoginPage);
  }

  goBack() {
    this.navCtrl.popTo(LoginPage);
  }
}
