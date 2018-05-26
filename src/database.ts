import Dexie from 'dexie';

export class MoneyMapAppDB extends Dexie {

		operation: Dexie.Table<ITransaction, number>

		constructor() {
				super('moneymapdb');
				this.version(1).stores({
						operation: 'id++,title,amount,lat,lon,imageURL'
				});
				this.operation.mapToClass(Transaction);
		}

		save(data){
				return this.operation.add(data);
		}

		update(id, data) {
				return this.operation.update(id, data);
		}

		getAll() {
				return this.operation.orderBy('id').reverse().toArray();
		}

		remove(id) {
				return this.operation.delete(id);
    }

}

export interface ITransaction {
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
export class Transaction implements ITransaction {

		id?: number;
		title: string;
		amount: number;
		lat: number;
		lng: number;
		imageURL: string;

		constructor(title: string, amount: number, lat?: number, lng?: number, imageURL?: string, id?: number) {
				this.title = title;
				this.amount = amount;
				if (id) this.id = id;
				if (lat) this.lat = lat;
				if (lng) this.lng = lng;
				if (imageURL) this.imageURL = imageURL;
    }

    cleanCoords(){
      this.lat = null;
			this.lng = null;
    }

    setCoords(coords){
      this.lat = coords.latitude;
			this.lng = coords.longitude;
    }


}


export let db = new MoneyMapAppDB()
