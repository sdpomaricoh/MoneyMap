import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddTransactionPage } from '../add-transaction/add-transaction';
import { TransactionService } from '../../services/transaction.service';
import { WalletService } from '../../services/wallet.service';
import { Wallet } from '../../database';

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
  wallet: Wallet = new Wallet('', 0);

  constructor(public navCtrl: NavController, public navParams: NavParams, public transactionService: TransactionService, public walletService: WalletService) {
    this.title = "Money map"
    this.pushPage = AddTransactionPage;
    this.transactions = [];
  }
  ionViewWillEnter(){
    if(this.walletService.empty()) this.walletService.validateFirtsWallet();
    this.loadTransactions();
    this.loadWallet();
  }

  loadTransactions(){
    this.transactionService.all().then((results)=>{
      this.transactions = results;
    })
  }

  loadWallet(){
    this.walletService.get().then((wallet)=>{
      this.wallet = wallet;
    })
  }
}
