import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { AdvertisePage } from '../pages/advertise/advertise';
import { AboutUsPage } from '../pages/about-us/about-us';
//will be removed
import { NotificationAPage } from '../pages/notification-a/notification-a';
import { NotificationBPage } from '../pages/notification-b/notification-b';
//end

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make LoginPage the root (or first) page
  rootPage: any = WalkthroughPage;

  pages: Array<{title: string, icon: string, component: any}>;
  pushPages: Array<{title: string, icon: string, component: any}>;

  constructor(
    platform: Platform,
    public menu: MenuController,
    public app: App,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public storage: Storage,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.statusBar.styleDefault();
    });

    this.pages = [
      { title: 'Home', icon: 'home', component: TabsNavigationPage },
    ];

    this.pushPages = [
      { title: 'About us', icon: 'home', component: AboutUsPage },
      { title: 'Advertise with us', icon: 'home', component: AdvertisePage },
      { title: 'temp Notification 1', icon: 'home', component: NotificationAPage },
      { title: 'temp Notification 2', icon: 'home', component: NotificationBPage },
    ];
  }

  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }

  pushPage(page) {
    this.menu.close();
    this.app.getRootNav().push(page.component);
  }

  logout() {
    this.menu.close();
    this.storage.set("users", null).then(data => {
      this.nav.setRoot(LoginPage);
    }).catch(err => {
      this.nav.setRoot(LoginPage);
    })
  }
}
