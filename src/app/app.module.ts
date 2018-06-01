import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MoneyMap } from './app.component';
import { MapPage } from '../pages/map/map';
import { WalletsPage } from '../pages/wallets/wallets';
import { TransactionsPage } from '../pages/transactions/transactions';
import { AddTransactionPage } from '../pages/add-transaction/add-transaction';
import { AddWalletPage } from '../pages/add-wallet/add-wallet';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';
import { GeolocationService } from '../services/geolocation.service';
import { WalletService } from '../services/wallet.service';
import { TransactionService } from '../services/transaction.service';
import { Camera } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';

@NgModule({
  declarations: [
    MoneyMap,
    MapPage,
    WalletsPage,
    TransactionsPage,
    AddTransactionPage,
    AddWalletPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MoneyMap),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MoneyMap,
    MapPage,
    WalletsPage,
    TransactionsPage,
    AddTransactionPage,
    AddWalletPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    Toast,
    GeolocationService,
    WalletService,
    TransactionService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
