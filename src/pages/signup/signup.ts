import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import { HttpProvider } from '../../providers/http/http';
import { MessageProvider } from '../../providers/message/message';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: FormGroup;
  main_page: { component: any };
  loading: any;
  dob: any;
  
  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public httpProvider: HttpProvider,
    public storage: Storage,
    public messageProvider: MessageProvider
  ) {
    this.main_page = { component: TabsNavigationPage };
    
    this.signup = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.minLength(6), Validators.required])),
      confirm_password: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
    });
    
    this.loading = this.loadingCtrl.create();
  }
  
  canDisable() {
    return !this.signup.valid;
  }
  
  changeDate(event) {
    this.dob = event.day + "/" + event.month + "/" + event.year;
  }
  
  doSignup() {
    if (this.signup.getRawValue().password != this.signup.getRawValue().confirm_password) {
      this.messageProvider.showMessage("Passwords do not match. Please try again.");
    } else {
      let rawValue = this.signup.getRawValue();
      let jsonData: any = {email: rawValue.email, password: rawValue.password, phonenumber: rawValue.mobile};
      this.signupViaHttp(jsonData);
    }
  }
  
  signupViaHttp(json) {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.httpProvider.getDataByPost(this.httpProvider.SIGNUP, json).then((data:any) => {
      this.loading.dismiss();
      if (data.status === 200) {
        this.storage.set("userInfo", data.userinfo);
        this.nav.setRoot(TabsNavigationPage);
      } else if (data.status === 600) {
        this.messageProvider.showMessage("ERR_CUSTOMER_SIGNUP_FAILED");
      } else if (data.status === 601) {
        this.messageProvider.showMessage("ERR_CUSTOMER_EMAIL_DUPLICATE");
      } else if (data.status === 602) {
        this.messageProvider.showMessage("ERR_CUSTOMER_INVALID_PASSWORD");
      } else if (data.status === 603) {
        this.messageProvider.showMessage("ERR_CUSTOMER_NOT_FOUND");
      } else if (data.status === 604) {
        this.messageProvider.showMessage("ERR_CUSTOMER_UPDATE_FAILED");
      } else if (data.status === 605) {
        this.messageProvider.showMessage("ERR_CUSTOMER_INVALID_VERIFYCODE");
      } else if (data.status === 606) {
        this.messageProvider.showMessage("ERR_CUSTOMER_FB_SIGNUP_REQUIRE");
      } else {
        this.messageProvider.showMessage("UNKOWN_ERROR");
      }
    }).catch(err => {
      this.loading.dismiss();
      this.messageProvider.showMessage("Sorry, There is any error");
    });
  }
  
  goBack() {
    this.nav.pop();
  }
}
