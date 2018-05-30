import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { db } from '../../database';
import { WalletService } from '../../services/wallet.service';
import { AddWalletPage } from '../add-wallet/add-wallet';
import { Toast } from '@ionic-native/toast';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public walletService: WalletService, private toast: Toast) {
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

  delete(wallet){

    if(this.wallets.length == 1)
      return this.showToast('Debes conservar al menos una cartera','top')

    if(this.walletService.getId() == wallet.id)
      return this.showToast('Selecciona otra cartera para eliminar esta','top')

    this.wallets = this.wallets.filter((w) => {
      return w.id != wallet.id;
    });

    db.removeWallet(wallet.id);

  }

  showToast(message: string, position: string){
    this.toast.show(message, 'short', position).subscribe(
      toast => console.log(toast)
    );
  }

}
