import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, App, ModalController, Events } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { MessageProvider } from '../../providers/message/message';
import { GlobalProvider } from '../../providers/global/global';
import { CategoryPage } from '../category/category';
import { CategoryListingPage } from '../category-listing/category-listing';
import { CompanyProfilePage } from '../company-profile/company-profile';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  refresher: any;
  loading: any;
  mostList: any = [];
  featuredList: any = [];
  newList: any = [];
  limit = 5;
  totalCallCount = 3;
  didCallCount = 0;
  search_string = "";
  searched_categories = [];
  companiesList = [];
  searched_companies = [];
  
  constructor (
    private platform: Platform,
    private navCtrl: NavController,
    private navParams: NavParams,
    private menuCtrl: MenuController,
    private global: GlobalProvider,
    private http: HttpProvider,
    private messageProvider: MessageProvider,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private app: App,
    private onesignal: OneSignal,
    private events: Events
  ) {
    /*this.platform.ready().then(() => {
      if (this.platform.is('ios') || this.platform.is('android')) {
        this.onesignal.startInit('3da23f43-b4e4-49c6-8ada-6e8b8452602e', '93392192219');
        this.onesignal.inFocusDisplaying(this.onesignal.OSInFocusDisplayOption.None);
        // this.onesignal.inFocusDisplaying(this.onesignal.OSInFocusDisplayOption.InAppAlert);
        this.onesignal.handleNotificationReceived().subscribe((msg) => {
          let msgStr: string = msg.payload.body;
          this.messageProvider.showMessage(msgStr);
        });
        this.onesignal.handleNotificationOpened().subscribe(() => {
          // this.reloadThreads(null);
        });
        this.onesignal.endInit();
      }
    });*/
    
    this.events.subscribe('company:http_call_end', () => {
      this.didCallCount ++;
      if (this.totalCallCount === this.didCallCount) {
        this.getCompaniesList();
      }
    });
    this.getData();
  }
  
  getData() {
    this.newList = this.featuredList = this.mostList = [];
    this.didCallCount = 0;
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    
    this.http.getDataByPost(this.http.COMPANY_LIST, {kind: "most", email: this.global.user_email, limit: this.limit}).then((value: any) => {
      this.mostList = value.list;
      this.mostList.forEach(element => {
        element.image_url = this.http.SITE + "/uploads/" + element.title + "_image.png";
      });
      this.events.publish('company:http_call_end');
    }).catch(() => {
      this.events.publish('company:http_call_end');
    });
    
    this.http.getDataByPost(this.http.COMPANY_LIST, {kind: "featured", email: this.global.user_email, limit: this.limit}).then((value: any) => {
      this.featuredList = value.list;
      this.featuredList.forEach(element => {
        element.image_url = this.http.SITE + "/uploads/" + element.title + "_image.png";
      });
      this.events.publish('company:http_call_end');
    }).catch(() => {
      this.events.publish('company:http_call_end');
    });
    
    this.http.getDataByPost(this.http.COMPANY_LIST, {kind: "new", email: this.global.user_email, limit: this.limit}).then((value: any) => {
      this.newList = value.list;
      this.newList.forEach(element => {
        element.image_url = this.http.SITE + "/uploads/" + element.title + "_image.png";
      });
      this.events.publish('company:http_call_end');
    }).catch(() => {
      this.events.publish('company:http_call_end');
    });
  }
  
  getCompaniesList() {
    this.companiesList = [];
    this.http.getDataByPost(this.http.COMPANY_LIST, {kind: "new", email: this.global.user_email, limit: "-1"}).then((data: any) => {
      this.companiesList = data.list;
      this.getCategories();
    }).catch(() => {
      this.getCategories();
    });
  }
  
  getCategories() {
    this.global.setCategory().then(() => {
      this.loading.dismiss();
    }).catch(() => {
      this.loading.dismiss();
    });
  }
  
  updateData() {
  }
  
  doRefresh(event) {
    this.refresher = event;
    this.doRefreshComplete();
  }
  
  doRefreshComplete() {
    if (this.refresher != undefined && this.refresher != null) {
      this.refresher.complete();
      this.refresher = undefined;
    }
  }
  
  showMenu() {
    this.menuCtrl.open();
  }
  
  searchCategory(event) {
    this.searched_categories = [];
    this.searched_companies = [];
    this.global.categories.forEach((category: any) => {
      if (category.sub_categories) {
        let c = {id: category.id, title: category.title, sub_categories: []};
        category.sub_categories.forEach(element => {
          let src: string = element.title.toLowerCase();
          if (src.includes(this.search_string.toLowerCase())) {
            c.sub_categories.push(element);
          }
        });
        if (c.sub_categories.length > 0) {
          this.searched_categories.push(c);
        }
      }
    });
    
    this.companiesList.forEach((company: any) => {
      let src: string = company.title.toLowerCase();
      if (src.includes(this.search_string.toLowerCase())) {
        this.searched_companies.push({title: company.title, id: company.id});
      }
    });

    this.searched_companies.sort(function(a,b) {return (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : ((b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0);});
  }
  
  goToCategoryListingPage(kind) {
    let categoryModal = this.modalCtrl.create(CategoryListingPage, {kind: kind});
    categoryModal.present();
  }
  
  goToCompanyProfilePage(id) {
    let modal = this.modalCtrl.create(CompanyProfilePage, {company_id: id});
    modal.present();
  }
  
  goToCategoryPage() {
    this.navCtrl.push(CategoryPage);
  }
  
  ionViewWillLeave() {
    this.events.unsubscribe('company:http_call_end');
  }
}
