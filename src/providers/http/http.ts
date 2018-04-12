import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpProvider {
  SIGNUP       = "";
  LOGIN        = "";
  
  // SIGNUP       = "/api/SignUp";
  // LOGIN        = "/api/Login";
  
  contentHeader: Headers = new Headers({"Content-Type": "application/json"});
  
  constructor (
    public http: Http
  ) {
    
  }
  
  signUp(json) {
    return new Promise(resolve => {
      this.contentHeader = new Headers({"Content-Type": "application/json"});
      this.http.post(this.SIGNUP, JSON.stringify(json), { headers : this.contentHeader }).map(res => res.json()).subscribe(data => {
        console.log("success");
        console.log(JSON.stringify(data));
        resolve(data);
      }, err => {
        console.log("error");
        console.log(JSON.stringify(err));
        resolve(err);
      });
    });
  }
  
  login(json) {
    return new Promise(resolve => {
      this.http.post(this.LOGIN, JSON.stringify(json), {headers : this.contentHeader}).map(res => res.json()).subscribe(data => {
        console.log("login success");
        console.log(data);
        resolve(data);
      }, err => {
        console.log("login failure");
        console.log(err);
        resolve(err);
      })
    });
  }
  
}
