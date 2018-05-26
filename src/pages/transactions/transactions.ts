import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { db } from '../../database';
import { AddingPage } from '../adding/adding';

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
  transactions: any;
  pushPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = "Money map"
    this.pushPage = AddingPage;
    this.transactions = [];
  }
  ionViewWillEnter(){
    this.loadTransactions()
  }

  loadTransactions(){
    db.getAll().then((results)=>{
      this.transactions = results;
    })
  }
}
