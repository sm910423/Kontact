import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpProvider {
  SITE        = "http://kontaktsite.wpengine.com";
  SERVER      = this.SITE + "/Kontakt_API/index.php";
  // SIGNUP      = this.SERVER + "/user/user_signup";
  // LOGIN       = this.SERVER + "/user/user_login";
  
  SIGNUP       = "/proxy_api/user/user_signup";
  LOGIN        = "/proxy_api/user/user_login";
  COMPANY_LIST = "/proxy_api/company/list";
  COMPANY      = "/proxy_api/company/details"
  EVENT_LIST   = "/proxy_api/event/list";
  EVENT        = "/proxy_api/event/details"
  
  contentHeader: Headers = new Headers({"Content-Type": "application/json"});
  
  constructor (
    public http: Http
  ) {
    
  }
  
  signUp(json) {
    return new Promise((resolve, reject) => {
      this.contentHeader = new Headers({"Content-Type": "application/json"});
      this.http.post(this.SIGNUP, JSON.stringify(json), { headers : this.contentHeader }).map(res => res.json()).subscribe(data => {
        console.log("signup success");
        console.log(JSON.stringify(data));
        resolve(data);
      }, err => {
        console.log("signup error");
        console.log(JSON.stringify(err));
        reject(err);
      });
    });
  }
  
  login(json) {
    return new Promise((resolve, reject) => {
      this.http.post(this.LOGIN, JSON.stringify(json), {headers : this.contentHeader}).map(res => res.json()).subscribe(data => {
        console.log("login success");
        console.log(data);
        resolve(data);
      }, err => {
        console.log("login failure");
        console.log(err);
        reject(err);
      })
    });
  }

  getAllCompanies(json) {
    return new Promise((resolve, reject) => {
      this.http.post(this.COMPANY_LIST, JSON.stringify(json), {headers: this.contentHeader}).map(res => res.json()).subscribe(data => {
        console.log("get company list success");
        console.log(data);
        resolve(data);
      }, err => {
        console.log("get company list failure");
        console.log(err);
        reject(err);
      });
    });
  }

  getCompanyInfo(json) {
    return new Promise((resolve, reject) => {
      this.http.post(this.COMPANY, JSON.stringify(json), {headers: this.contentHeader}).map(res => res.json()).subscribe(data => {
        console.log("get company info success");
        console.log(data);
        resolve(data);
      }, err => {
        console.log("get company info failure");
        console.log(err);
        reject(err);
      });
    });
  }

  getAllEvents(json) {
    return new Promise((resolve, reject) => {
      this.http.post(this.EVENT_LIST, JSON.stringify(json), {headers: this.contentHeader}).map(res => res.json()).subscribe(data => {
        console.log("get event list success");
        console.log(data);
        resolve(data);
      }, err => {
        console.log("get event list failure");
        console.log(err);
        reject(err);
      });
    });
  }

  getEventInfo(json) {
    return new Promise((resolve, reject) => {
      this.http.post(this.EVENT, JSON.stringify(json), {headers: this.contentHeader}).map(res => res.json()).subscribe(data => {
        console.log("get event info success");
        console.log(data);
        resolve(data);
      }, err => {
        console.log("get event info failure");
        console.log(err);
        reject(err);
      });
    });
  }
  
}
