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
import { CategoryListingPage } from '../pages/category-listing/category-listing'

import { PreloadImage } from '../components/preload-image/preload-image';
import { BackgroundImage } from '../components/background-image/background-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';
import { ColorRadio } from '../components/color-radio/color-radio';
import { CounterInput } from '../components/counter-input/counter-input';
import { Rating } from '../components/rating/rating';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import { Keyboard } from '@ionic-native/keyboard';
import { IonicStorageModule } from '@ionic/storage';

import { HttpProvider } from '../providers/http/http';
import { MessageProvider } from '../providers/message/message';


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
  ],
  providers: [
	  SplashScreen,
	  StatusBar,
    // Keyboard,
    HttpProvider, 
    MessageProvider, 
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
