import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MapPage } from '../pages/map/map';
import { WalletsPage } from '../pages/wallets/wallets';
import { TransactionsPage } from '../pages/transactions/transactions';

@Component({
  templateUrl: 'app.html'
})

export class MoneyMap {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TransactionsPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
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
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
