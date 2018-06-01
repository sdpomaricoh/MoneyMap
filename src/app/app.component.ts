import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MapPage } from '../pages/map/map';
import { WalletsPage } from '../pages/wallets/wallets';
import { TransactionsPage } from '../pages/transactions/transactions';
import { WalletService } from '../services/wallet.service';
import { db } from '../database';

@Component({
  templateUrl: 'app.html'
})

export class MoneyMap {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TransactionsPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public walletService: WalletService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Transacciones', component: TransactionsPage, icon: 'cash'},
      { title: 'Carteras', component: WalletsPage , icon: 'card'},
      { title: 'Mapa', component: MapPage, icon: 'map'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      db.on('populate', () => {
        db.wallet.add({
          name: "Cartera Principal",
          amount: 0
        }).then((result:any)=>{
          this.walletService.setId(result)
          this.nav.setRoot(WalletsPage);
        });
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
