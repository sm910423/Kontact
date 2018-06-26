import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { WalkthroughPage } from '../walkthrough/walkthrough';

import { HttpProvider } from '../../providers/http/http';
import { MessageProvider } from '../../providers/message/message';
import { NotificationAPage } from '../notification-a/notification-a';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: FormGroup;
  loading: any;
  visibleBackButton: boolean = true;
  
  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public httpProvider: HttpProvider,
    public storage: Storage,
    public messageProvider: MessageProvider
  ) {
    this.storage.get("visibleBackButton").then((value) => {
      this.visibleBackButton = value === true ? true : false;
    }).catch(() => {
      this.visibleBackButton = true;
    });
    if (this.nav.first()) {
      this.visibleBackButton = true;
    } else {
      this.visibleBackButton = false;
    }

    this.login = new FormGroup({
      usersEmail: new FormControl('test@test.com', Validators.required),
      usersPassword: new FormControl('qwerasdf', Validators.required)
    });
    
    this.loading = this.loadingCtrl.create();
  }
  
  doLogin() {
    let jsonData: any = {};
    jsonData.email = this.login.getRawValue().usersEmail;
    jsonData.password = this.login.getRawValue().usersPassword;
    
    this.loginViaHttp(jsonData);
  }
  
  loginViaHttp(json) {
    console.log(this.httpProvider.LOGIN);
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.httpProvider.getDataByPost(this.httpProvider.LOGIN, json).then((data:any) => {
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
  
  goToSignup() {
    this.nav.push(SignupPage);
  }
  
  goToForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }
  
  goBack() {
    this.nav.pop();
  }
  
  goToNotificationPage() {
    this.nav.push(NotificationAPage);
  }
  
}
