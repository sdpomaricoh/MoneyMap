import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { db } from '../../database';
import { WalletService } from '../../services/wallet.service';
import { AddWalletPage } from '../add-wallet/add-wallet';

/**
 * Generated class for the WalletsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-wallets',
  templateUrl: 'wallets.html',
})

export class WalletsPage {

  title: String;
  wallets: any;
  pushPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public walletService: WalletService) {
    this.pushPage = AddWalletPage;
  }

  ionViewWillEnter() {
    this.walletService.validateFirtsWallet();
    this.loadWallets();
  }

  loadWallets(){
    db.getAllWallets().then((results)=>{
      this.wallets = results;
    })
  }

  set(wallet){
    this.walletService.setId(wallet.id);
  }

}
