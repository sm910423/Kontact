import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'page-advertise',
  templateUrl: 'advertise.html',
})
export class AdvertisePage {
  advertise: FormGroup;

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.advertise = new FormGroup({
      email: new FormControl('', Validators.required),
      mobile: new FormControl(''),
      name: new FormControl(''),
      company: new FormControl(''),
    });
  }

  goToBack() {
    this.navCtrl.pop();
  }

}
