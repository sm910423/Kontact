import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpProvider {
  SERVER      = "http://kontaktsite.wpengine.com/Backend/Kontakt_API/index.php";
  // SIGNUP      = this.SERVER + "/user/user_signup";
  // LOGIN       = this.SERVER + "/user/user_login";
  
  SIGNUP       = "/api/user/user_signup";
  LOGIN        = "/api/user/user_login";
  
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
  
}
