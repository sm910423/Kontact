import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { LoginPage } from '../login/login';
import { HttpProvider } from '../../providers/http/http';
import { MessageProvider } from '../../providers/message/message';

@Component({
  selector: 'forgot-password-page',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  forgot_password: FormGroup;
  loading: any;
  main_page: { component: any };

  constructor (
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public httpProvider: HttpProvider,
    public messageProvider: MessageProvider
  ) {
    this.main_page = { component: LoginPage };

    this.forgot_password = new FormGroup({
      email: new FormControl('', Validators.required)
    });

    this.loading = this.loadingCtrl.create();
  }

  recoverPassword() {
    // console.log(this.forgot_password.value);
    // this.nav.setRoot(this.main_page.component);
    this.loading.present();
    let jsonData: any = {};
    jsonData.usersEmail = this.forgot_password.getRawValue().email;
  }

}
