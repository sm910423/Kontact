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
      mobile: new FormControl(''),
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
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      this.loading.dismiss();
      this.nav.setRoot(TabsNavigationPage);
    }
  }
  
  signupViaHttp(json) {
    if (this.loading != null && this.loading != undefined) {
      this.loading.dismiss();
    }
    this.loading.present();
    this.httpProvider.signUp(json).then((data:any) => {
      this.loading.dismiss();
      if (data.responseCode == "101") {
        if (data.usersData != null && data.usersData != undefined) {
          console.log(data.usersData)
          this.storage.set("users", {usersId: data.usersData.usersId, token: data.usersData.token}).then(data => {
            this.nav.setRoot(this.main_page.component);
          }).catch(err => {
            this.nav.setRoot(this.main_page.component);
          });
        }
      } else if (data.responseCode == "102") {
        this.messageProvider.showMessage("No User data");
      } else if (data.responseCode == "103") {
        this.messageProvider.showMessage("Account Creation Failed");
      } else if (data.responseCode == "104") {
        this.messageProvider.showMessage("Email Address already exists");
        if (json.signupType == "manual") {
          this.nav.push(ForgotPasswordPage);
        }
      } else if (data.responseCode == "105") {
        this.messageProvider.showMessage("No email supplied");
      } else if (data.responseCode == "106") {
        this.messageProvider.showMessage("Select User Fail");
      } else {
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
