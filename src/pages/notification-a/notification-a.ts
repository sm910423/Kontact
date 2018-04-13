import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

}
