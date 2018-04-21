import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage {

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

}
