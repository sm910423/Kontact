import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Calendar } from '@ionic-native/calendar';

import { HttpProvider } from '../../providers/http/http';
import { MessageProvider } from '../../providers/message/message';
import { GlobalProvider } from '../../providers/global/global';
import moment from 'moment';
import { LocationPage } from '../location/location';

@Component({
  selector: 'page-whats-on-details',
  templateUrl: 'whats-on-details.html',
})
export class WhatsOnDetailsPage {
  event_id;
  event;
  calendars;
  
  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private http: HttpProvider,
    private message: MessageProvider,
    private global: GlobalProvider,
    private calendar: Calendar,
    private iab: InAppBrowser,
  ) {
    this.event_id = this.navParams.get("event_id");
    this.getEventInfo();
    /*this.calendar.listCalendars().then(data => {
      console.log("calendars:", JSON.stringify(data));
      this.calendars = data;
    });*/
  }
  
  getEventInfo() {
    this.event = {};
    let loading = this.loadingCtrl.create();
    
    loading.present();
    let json = {email: this.global.user_email, id: this.event_id};
    this.http.getDataByPost(this.http.EVENT, json).then((data: any) => {
      loading.dismiss();
      this.event = data.info;
      this.event.image_url = this.http.SITE + "/uploads/" + this.event.image;
      let st = this.event.time.split(" ").join("T");
      this.event.month_str = moment(st).format("MMM");
      this.event.day_str = moment(st).format("DD");
      this.event.date_str = moment(st).format("LLLL");
    }).catch(() => {
      loading.dismiss();
    });
  }

  addEvent(event) {
    let st = this.event.time.split(" ").join("T");
    // console.log(st);
    let date = new Date(st);
    let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    date = new Date(date.getTime() + userTimezoneOffset);
    // console.log(date.toString());
 
    this.calendar.createEvent(event.title, event.place, event.content, date, date).then(res => {
      console.log('created event in the calendar', JSON.stringify(res));
    }, err => {
      console.log('err: ', err);
    });
  }

  openCal(cal) {
    //ios
    this.calendar.findAllEventsInNamedCalendar(cal.name).then(data => {
      console.log("events", JSON.stringify(data));
    });
  }

  doAddCalendar(event) {
    this.addEvent(event);
  }
  
  goToBack() {
    this.navCtrl.pop();
  }
  
  goToWebsitePage(url) {
    const browser = this.iab.create(url);
    browser.show();
  }

  goToLocationPage(address) {
    this.navCtrl.push(LocationPage, {address: address});
  }
}
