import { Injectable } from '@angular/core';
import { db, Transaction } from '../database';
import { WalletService } from './wallet.service';


@Injectable()
export class TransactionService {
  constructor(public walletService: WalletService){

  }

  all(): any {
    return db.getAllTransaction(this.walletService.getId())
  }
}
