import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MoneyMap } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TransactionsPage } from '../pages/transactions/transactions';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MoneyMap,
    AboutPage,
    ContactPage,
    TransactionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MoneyMap),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MoneyMap,
    AboutPage,
    ContactPage,
    TransactionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
