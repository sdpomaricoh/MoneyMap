import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MoneyMap } from './app.component';
import { MapPage } from '../pages/map/map';
import { ContactPage } from '../pages/contact/contact';
import { TransactionsPage } from '../pages/transactions/transactions';
import { AddingPage } from '../pages/adding/adding';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';
import { GeolocationService } from '../services/geolocation.service';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MoneyMap,
    MapPage,
    ContactPage,
    TransactionsPage,
    AddingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MoneyMap),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MoneyMap,
    MapPage,
    ContactPage,
    TransactionsPage,
    AddingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    GeolocationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
