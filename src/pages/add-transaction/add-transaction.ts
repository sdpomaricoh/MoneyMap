import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';

import { GeolocationService } from '../../services/geolocation.service';
import { TransactionService } from '../../services/transaction.service';
import { WalletService } from '../../services/wallet.service';
import { Transaction } from '../../database';

/**
 * Generated class for the AddingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-adding',
  templateUrl: 'add-transaction.html',
})
export class AddTransactionPage {

  transaction: Transaction;
  showGeolocation: Boolean = true;
  shouldSend: Boolean = false;
  photo: String;
  income: Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocator: GeolocationService, private camera: Camera, public walletService: WalletService, public transactionService: TransactionService, private toast: Toast) {
    this.transaction = this.cleanTransaction();
    this.photo = null;
    this.getLocation()
  }

  getPhoto(){
    const options: CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      allowEdit: false,
      saveToPhotoAlbum: false,
      targetHeight: 625,
      targetWidth: 625
    }

    this.camera.getPicture(options).then((photo) => {

      let base64Image = 'data:image/jpeg;base64,' + photo;
      this.photo = base64Image;
      this.transaction.imageURL = this.photo;

    }).catch((err) => {
      console.log(err);
    })

  }

  getLocation(){

    if(this.showGeolocation){

      this.geolocator.get().then((position) => {

        this.transaction.setCoords(position.coords);
        this.shouldSend = true;

      }).catch((err)=>{
        this.showToast('No se puede acceder a la geolocalización','top');
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
        this.transaction.amount = this.convertAmountToString();
        this.transactionService.save(this.transaction).then((result)=>{
          this.transaction = this.cleanTransaction();
          this.navCtrl.pop()
        })
      }else{
        this.showToast('Es necesario agregar una descripción y un valor','top');
      }
    }
  }

  convertAmountToString(){

    let value = this.transaction.amount.toString()
    let amount = parseInt(value)

    if(!this.income) return amount*-1;
    return amount
  }

  cleanTransaction(){
    let transaction = new Transaction('',null);
    transaction.walletID = this.walletService.getId()
    return transaction;
  }

  showToast(message: string, position: string){
    this.toast.show(message, 'short', position).subscribe(
      toast => console.log(toast)
    );
  }

}
