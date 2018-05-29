import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { db } from '../../database';
import { AddTransactionPage } from '../add-transaction/add-transaction';
import { TransactionService } from '../../services/transaction.service';
import { WalletService } from '../../services/wallet.service';

/**
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  title: string;
  transactions: any;
  pushPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public transactionService: TransactionService, public walletService: WalletService) {
    this.title = "Money map"
    this.pushPage = AddTransactionPage;
    this.transactions = [];
  }
  ionViewWillEnter(){
    if(this.walletService.empty()) this.walletService.validateFirtsWallet();
    this.loadTransactions()
  }

  loadTransactions(){
    this.transactionService.all().then((results)=>{
      this.transactions = results;
    })
  }
}
