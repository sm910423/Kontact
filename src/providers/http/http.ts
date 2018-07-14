import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpProvider {
  SITE        = "http://kontaktsite.wpengine.com";
  SERVER      = this.SITE + "/Kontakt_API/index.php";
  SIGNUP       = this.SERVER + "/user/user_signup";
  LOGIN        = this.SERVER + "/user/user_login";
  COMPANY_LIST = this.SERVER + "/company/list";
  COMPANY      = this.SERVER + "/company/details";
  COMPANY_UPDATE = this.SERVER + "/company/update";
  EVENT_LIST   = this.SERVER + "/event/list";
  EVENT        = this.SERVER + "/event/details";
  COMMUNITY_LIST = this.SERVER + "/community/list";
  COMMUNITY    = this.SERVER + "/community/details";
  OFFER_LIST   = this.SERVER + "/offer/list";
  OFFER        = this.SERVER + "/offer/details"
  CATEGORIES   = this.SERVER + "/company/categories";
  SUBCATEGORIES= this.SERVER + "/company/subcategories";
  ABOUT        = this.SERVER + "/other/about";
  ADVERTISE    = this.SERVER + "/other/advertise";
  
  contentHeader: Headers = new Headers({"Content-Type": "application/json"});
  
  constructor (
    public http: Http
  ) {
  }

  getDataByPost(url, json) {
    return new Promise((resolve, reject) => {
      this.http.post(url, JSON.stringify(json), {headers: this.contentHeader}).map(res => res.json()).subscribe(data => {
        // console.log("get http success");
        // console.log(data);
        resolve(data);
      }, err => {
        console.log("get http failure");
        console.log(err);
        reject(err);
      });
    });
  }
}
