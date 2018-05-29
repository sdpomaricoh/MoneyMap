import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Wallet, db } from '../../database';


/**
 * Generated class for the AddWalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-wallet',
  templateUrl: 'add-wallet.html',
})
export class AddWalletPage {

  wallet: Wallet;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.wallet = this.cleanWallet();
  }

  save(wallet){
    if(wallet.name !== "" && wallet.amount !== ""){
      db.saveWallet(wallet).then((result)=>{
        this.wallet = this.cleanWallet();
        this.navCtrl.pop()
      })
    }else{
      let toast = this.toastCtrl.create({
        message: 'Es necesario agregar un nombre y un valor',
        duration: 3000,
        showCloseButton: true,
        closeButtonText: "Ok"
      });
      toast.present();
    }
  }

  cleanWallet(){
    let wallet = new Wallet('',null);
    return wallet;
  }

}
