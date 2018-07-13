import { Injectable } from '@angular/core';
import { Platform, ToastController, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

declare var navigator: any;
declare var Connection: any;
  
@Injectable()
export class NetworkConnectionProvider {
  connected: Subscription;
  disconnected: Subscription;
  isConnect: boolean = false;
  isOnToOff: boolean = false;
  isOffToOn: boolean = true;

  constructor(
    private toast: ToastController,
    private platform: Platform,
    public network: Network,
    public events: Events
  ) {
  }

  init() {
    this.platform.ready().then(() => {
      var networkState = navigator.connection.type;
      let isConnect:boolean = false;
      if (networkState == Connection.NONE) {
        isConnect = false;
      } else {
        isConnect = true;
      }
      this.isConnect = isConnect;
      
      this.connected = this.network.onConnect().subscribe(data => {
        this.isConnect = true;
        this.isOffToOn = true;
        this.isOnToOff = false;
        this.displayNetworkUpdate(data.type);
        this.sendEvents(this.isConnect);
      }, error => console.error(error));
  
      this.disconnected = this.network.onDisconnect().subscribe(data => {
        this.isConnect = false;
        this.isOnToOff = true;
        this.isOffToOn = false;
        this.displayNetworkUpdate(data.type);
        this.sendEvents(this.isConnect);
      }, error => console.error(error));
    });
  }

  sendEvents(isConnect) {
    this.events.publish('Sync:SetNetwork', isConnect);
    this.events.publish('JobList:SetNetwork', isConnect);
    this.events.publish('JobSearch:SetNetwork', isConnect);
  }
  
  displayNetworkUpdate(connectionState: string){
    this.toast.create({
      message: `You are now ${connectionState}`,
      duration: 3000
    }).present();
  }

  releaseConnects(): void {
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
  }

  procNetworkError(): boolean {
    if (this.isConnect) {
      return false;
    } else {
      let toast = this.toast.create({
        message: 'You are now offline.',
        duration: 3000
      });
      toast.present();

      return true;
    }
    // return false;
  }
}
