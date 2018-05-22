import { Dexie } from 'dexie';

export class MoneyMapDB extends Dexie{

  transactions: Dexie.Table<iTransaction,number>

  constructor(){
    super('moneymapdb');
    this.version(1).stores({
      transactions: 'id++,title,amount,lat,lon,imageURL'
    });

    this.transactions.mapToClass(Transaction);
  }
}

export interface iTransaction{
  id?: number;
  title: string;
  amount: number;
  lat: number;
  lng: number;
  imageURL: string;
}


/**
 * Model Transactions
 */
export class Transaction implements iTransaction {

  id?: number;
  title: string;
  amount: number;
  lat: number;
  lng: number;
  imageURL: string;

  constructor(title: string, amount: number, lat?: number, lng?: number, imageURL? : string, id? : number){
    this.title =  title;
    this.amount = amount;
    if (id) this.id = id;
    if (lat) this.lat = lat;
    if (lng) this.lng = lng;
    if (imageURL) this.imageURL = imageURL;
  }
}
