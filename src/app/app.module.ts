import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { MainPage } from '../pages/main/main';
import { CategoryPage } from '../pages/category/category';
import { SubCategoryPage } from '../pages/sub-category/sub-category';
import { CategoryListingPage } from '../pages/category-listing/category-listing';
import { NotificationAPage } from '../pages/notification-a/notification-a';
import { NotificationBPage } from '../pages/notification-b/notification-b';
import { CommunityPage } from '../pages/community/community';
import { CommunityListingPage } from '../pages/community-listing/community-listing';
import { CommunityViewPage } from '../pages/community-view/community-view';
import { WhatsOnPage } from '../pages/whats-on/whats-on';
import { WhatsOnCategoryPage } from '../pages/whats-on-category/whats-on-category';
import { WhatsOnDetailsPage } from '../pages/whats-on-details/whats-on-details';
import { AdvertisePage } from '../pages/advertise/advertise';
import { AboutUsPage } from '../pages/about-us/about-us';
import { CompanyProfilePage } from '../pages/company-profile/company-profile';
import { CallPage } from '../pages/call/call';
import { WebsitePage } from '../pages/website/website';

import { PreloadImage } from '../components/preload-image/preload-image';
import { BackgroundImage } from '../components/background-image/background-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';
import { ColorRadio } from '../components/color-radio/color-radio';
import { CounterInput } from '../components/counter-input/counter-input';
import { Rating } from '../components/rating/rating';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import { Keyboard } from '@ionic-native/keyboard';
import { OneSignal } from '@ionic-native/onesignal';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { HttpProvider } from '../providers/http/http';
import { MessageProvider } from '../providers/message/message';
import { GlobalProvider } from '../providers/global/global';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsNavigationPage,
    WalkthroughPage,
    SignupPage,
    ForgotPasswordPage,
    MainPage,
    CategoryPage,
    SubCategoryPage,
    CategoryListingPage,
    NotificationAPage,
    NotificationBPage,
    CommunityPage,
    CommunityListingPage,
    CommunityViewPage,
    WhatsOnPage,
    WhatsOnCategoryPage,
    WhatsOnDetailsPage,
    AdvertisePage,
    AboutUsPage,
    CompanyProfilePage,
    CallPage,
    WebsitePage,

    PreloadImage,
    BackgroundImage,
    ShowHideContainer,
    ShowHideInput,
    ColorRadio,
    CounterInput,
    Rating,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsNavigationPage,
    WalkthroughPage,
    ForgotPasswordPage,
    SignupPage,
    MainPage,
    CategoryPage,
    SubCategoryPage,
    CategoryListingPage,
    NotificationAPage,
    NotificationBPage,
    CommunityPage,
    CommunityListingPage,
    CommunityViewPage,
    WhatsOnPage,
    WhatsOnCategoryPage,
    WhatsOnDetailsPage,
    AdvertisePage,
    AboutUsPage,
    CompanyProfilePage,
    CallPage,
    WebsitePage,
  ],
  providers: [
	  SplashScreen,
    StatusBar,
    OneSignal,
    CallNumber,
    // Keyboard,
    HttpProvider, 
    MessageProvider, 
    InAppBrowser,
    GlobalProvider,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
