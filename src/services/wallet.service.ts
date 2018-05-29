import { Injectable } from '@angular/core';
import { db } from '../database';

export const StorageKey = 'walletID';

@Injectable()
export class WalletService {

  constructor() {}

  setId(walletID){
    localStorage.setItem(StorageKey,walletID)
  }

  getId(): Number{
    return parseInt(localStorage.getItem(StorageKey))
  }

  empty(): Boolean {
    return !localStorage.getItem(StorageKey);
  }

  validateFirtsWallet(){
    return new Promise((resolve, reject) =>{
      db.firtsWallet().then((wallet) => {
        if(!wallet) {

          db.wallet.add({
            name: "Cartera Principal",
            amount: 0
          }).then((result: any) =>{
            this.setId(result.id)
            resolve();
          });

        } else {
          this.setId(wallet.id)
          resolve();
        }
      });
    })
  }
}
