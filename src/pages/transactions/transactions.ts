import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { db } from '../../database';

/**
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = "Money map"
  }

  ionViewDidLoad() {
    db.save({title: "primera transacción", amount: 0});
  }

}
