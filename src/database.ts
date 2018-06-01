import Dexie from 'dexie';
import { WalletService } from './services/wallet.service';

export const walletService = new WalletService();

export class MoneyMapAppDB extends Dexie {

  operation: Dexie.Table<ITransaction, number>
  wallet: Dexie.Table<IWallet, number>

  constructor() {
      super('moneymapdb');
      this.version(1).stores({
          operation: 'id++,title,amount,lat,lon,imageURL,walletID',
          wallet: 'id++,name,amount'
      });
      this.operation.mapToClass(Transaction);
      this.wallet.mapToClass(Wallet);

  }

  saveTransaction(data){
    return this.operation.add(data);
  }

  updateTransaction(id, data) {
    return this.operation.update(id, data);
  }

  getAllTransaction(walletID) {
    return this.operation.where('walletID').equals(walletID).reverse().toArray();
  }

  removeTransaction(id) {
    return this.operation.delete(id);
  }

  saveWallet(data){
    return this.wallet.add(data)
  }

  getAllWallets() {
    return this.wallet.orderBy('id').reverse().toArray();
  }

  firtsWallet() {
    return this.wallet.orderBy('id').limit(1).first();
  }

  removeWallet(id) {
    return this.operation.delete(id);
  }

  findWallet(id){
    return this.wallet.get(id);
  }

  updateWallet(id, amount: number){
    return this.wallet.update(id,{ amount: amount});
  }
}

export interface ITransaction {
  id?: Number;
  title: String;
  amount: Number;
  lat: Number;
  lng: Number;
  imageURL: String;
  walletID: Number;
}

export interface IWallet{
  id?: Number;
  name: String;
  amount: Number;
}

/**
 * Model Transactions
 */
export class Transaction implements ITransaction {

  id?: Number;
  title: String;
  amount: Number;
  lat: Number;
  lng: Number;
  imageURL: String;
  walletID: Number;

  constructor(title: string, amount: number, lat?: number, lng?: number, imageURL?: string, id?: number, walletID?: Number) {
      this.title = title;
      this.amount = amount;
      if (id) this.id = id;
      if (lat) this.lat = lat;
      if (lng) this.lng = lng;
      if (imageURL) this.imageURL = imageURL;
      if (walletID) this.walletID = walletID;
  }

  cleanCoords(){
    this.lat = null;
    this.lng = null;
  }

  setCoords(coords){
    this.lat = coords.latitude;
    this.lng = coords.longitude;
  }

  hasLocation(): Boolean {
    if(this.lat && this.lng) return true;
    return false;
  }

  getImage(): String {
    if(this.imageURL) return this.imageURL;
    return 'blue'
  }


}

export class Wallet implements IWallet{
  id?: Number;
  name: String;
  amount: Number;

  constructor(name: string, amount: number, id?: number) {
      this.name = name;
      this.amount = amount;
      if (id) this.id = id;
  }
}

export let db = new MoneyMapAppDB()

db.on('populate', () => {
  db.wallet.add({
    name: "Cartera Principal",
    amount: 0
  }).then((result:any)=>{
    walletService.setId(result)
  });
});
