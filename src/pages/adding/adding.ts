import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  photo: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocator: GeolocationService, public toastCtrl: ToastController, private camera: Camera) {
    this.transaction = new Transaction('', null);
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
