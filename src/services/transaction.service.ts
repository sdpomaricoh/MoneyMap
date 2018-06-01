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

  save(transaction: Transaction): any{
    let transactionSavePromise = db.saveTransaction(transaction);
    let walletUpdatedPromise = this.walletService.update(transaction.amount);
    return Promise.all([transactionSavePromise, walletUpdatedPromise]);
  }
}
