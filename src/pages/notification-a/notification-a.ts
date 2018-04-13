import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationBPage } from '../notification-b/notification-b';

@Component({
  selector: 'page-notification-a',
  templateUrl: 'notification-a.html',
})
export class NotificationAPage {

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  goToNextPage() {
    this.navCtrl.push(NotificationBPage);
  }

  goBack() {
    this.navCtrl.pop();
  }
}
