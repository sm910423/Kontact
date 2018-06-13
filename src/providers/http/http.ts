import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpProvider {
  SITE        = "http://kontaktsite.wpengine.com";
  SERVER      = this.SITE + "/Kontakt_API/index.php";
  // SIGNUP       = this.SERVER + "/user/user_signup";
  // LOGIN        = this.SERVER + "/user/user_login";
  // COMPANY_LIST = this.SERVER + "/company/list";
  // COMPANY      = this.SERVER + "/company/details";
  // EVENT_LIST   = this.SERVER + "/event/list";
  // EVENT        = this.SERVER + "/event/details";
  // COMMUNITY_LIST = this.SERVER + "/proxy_api/community/list";
  // COMMUNITY    = this.SERVER + "/proxy_api/community/details";
  // CATEGORIES   = this.SERVER + "/company/categories";
  // SUBCATEGORIES= this.SERVER + "/company/subcategories";
  
  SIGNUP       = "/proxy_api/user/user_signup";
  LOGIN        = "/proxy_api/user/user_login";
  COMPANY_LIST = "/proxy_api/company/list";
  COMPANY      = "/proxy_api/company/details";
  EVENT_LIST   = "/proxy_api/event/list";
  EVENT        = "/proxy_api/event/details";
  COMMUNITY_LIST = "/proxy_api/community/list";
  COMMUNITY    = "/proxy_api/community/details";
  CATEGORIES   = "/proxy_api/company/categories";
  SUBCATEGORIES= "/proxy_api/company/subcategories";
  
  contentHeader: Headers = new Headers({"Content-Type": "application/json"});
  
  constructor (
    public http: Http
  ) {
    
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
