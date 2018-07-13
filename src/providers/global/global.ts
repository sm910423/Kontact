import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
// import { Storage } from '@ionic/storage';

@Injectable()
export class GlobalProvider {
  user_email: string = "";
  categories = [];
  
  constructor (
    private http: HttpProvider,
    // private storage: Storage,
  ) {
  }
  
  setCategory() {
    return new Promise(resolve => {
      this.http.getDataByPost(this.http.CATEGORIES, {email: this.user_email}).then((values: any) => {
        this.categories = values.categories;
        this.categories.forEach((category: any, index) => {
          this.http.getDataByPost(this.http.SUBCATEGORIES, {email: this.user_email, category_id: category.id}).then((data: any) => {
            category.sub_categories = data.subcategories;
            if (index == (this.categories.length - 1)) {
              resolve(true);
            }
          }).catch(() => {
            if (index == (this.categories.length - 1)) {
              resolve(true);
            }
          });
        });
      }).catch(() => {
        resolve(false);
      });
    });
  }

  convertAnchorToButton(str: string) {
    str = str.replace(/\\'/g, "'");
    str = str.replace(/<a /g, "<a target='_blank' ");
    // str = str.replace(/<a /g, "<button ion-button clear (click)=\"goExternalSite(this)\" ");
    // str = str.replace(/<\/a>/g, "</button>");
    return str;
  }
  
}
