import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpProvider {
  isBrowser = false;
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
  CATEGORIES   = this.SERVER + "/company/categories";
  SUBCATEGORIES= this.SERVER + "/company/subcategories";
  
  contentHeader: Headers = new Headers({"Content-Type": "application/json"});
  
  constructor (
    public http: Http
  ) {
    if (this.isBrowser) {
      this.SIGNUP       = "/proxy_api/user/user_signup";
      this.LOGIN        = "/proxy_api/user/user_login";
      this.COMPANY_LIST = "/proxy_api/company/list";
      this.COMPANY      = "/proxy_api/company/details";
      this.COMPANY_UPDATE = "/proxy_api/company/update";
      this.EVENT_LIST   = "/proxy_api/event/list";
      this.EVENT        = "/proxy_api/event/details";
      this.COMMUNITY_LIST = "/proxy_api/community/list";
      this.COMMUNITY    = "/proxy_api/community/details";
      this.CATEGORIES   = "/proxy_api/company/categories";
      this.SUBCATEGORIES= "/proxy_api/company/subcategories";
    }
  }

  getDataByPost(url, json) {
    return new Promise((resolve, reject) => {
      this.http.post(url, JSON.stringify(json), {headers: this.contentHeader}).map(res => res.json()).subscribe(data => {
        console.log("get http success");
        console.log(data);
        resolve(data);
      }, err => {
        console.log("get http failure");
        console.log(err);
        reject(err);
      });
    });
  }
}
