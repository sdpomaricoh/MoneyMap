import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { GeolocationService } from '../../services/geolocation.service';
import { Transaction, db } from '../../database';

/**
 * Generated class for the AddingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adding',
  templateUrl: 'adding.html',
})
export class AddingPage {

  transaction: Transaction;
  showGeolocation: Boolean = true;
  shouldSend: Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocator: GeolocationService, public toastCtrl: ToastController) {
    this.transaction = new Transaction('', null);
    this.getLocation()
  }


  ionViewDidLoad() {

  }

  getLocation(){

    if(this.showGeolocation){

      this.geolocator.get().then((position) => {

        this.transaction.setCoords(position.coords);
        this.shouldSend = true;

      }).catch((err)=>{
        let toast = this.toastCtrl.create({
          message: 'No se puede acceder a la geolocalización',
          duration: 3000
        });
        toast.present();
        this.shouldSend = true
      })

    } else{
      this.transaction.cleanCoords();
      this.shouldSend = true;
    }
  }

  save(transaction){
    if(this.shouldSend){
      if(transaction.title !== "" && transaction.amount !== ""){
        db.save(transaction).then((result)=>{
          this.transaction = new Transaction('',null);
          this.navCtrl.pop()
        })
      }else{
        let toast = this.toastCtrl.create({
          message: 'Es necesario agregar una descripción y un valor',
          duration: 3000,
          showCloseButton: true,
          closeButtonText: "Ok"
        });
        toast.present();
      }
    }
  }

}
