import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, Marker, LatLng, MarkerOptions, MarkerIcon } from '@ionic-native/google-maps';
import { GeolocationService } from '../../services/geolocation.service';
import { db } from '../../database';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  title: String;
  map: GoogleMap;
  coords: any;
  transactions: any;

  constructor(public navCtrl: NavController, public geolocator: GeolocationService, public toastCtrl: ToastController) {
    this.title = "Mapa";
    this.transactions = [];
  }

  ionViewWillEnter() {
    this.loadMap();
  }

  loadMap(){

    this.geolocator.get().then((position) => {

      this.coords = position.coords;

      let mapOptions: GoogleMapOptions = {
        controls: {
          'compass': true,
          'myLocationButton': true,
          'myLocation': true,
          'indoorPicker': true,
          'zoom': true,
        },
        gestures: {
          scroll: true,
          tilt: true,
          zoom: true,
          rotate: true
        },
        preferences: {
          padding: {
            left: 10,
            top: 10,
            bottom: 10,
            right: 10
          }
        },
        camera: {
          target: {
            lat: this.coords.latitude,
            lng: this.coords.longitude
          },
          zoom: 18,
          tilt: 30
        }
      };

      this.map = GoogleMaps.create('map', mapOptions);

      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(()=>{
        this.loadMarkers()
      })

    }).catch((err)=>{
      let toast = this.toastCtrl.create({
        message: 'No se puede acceder a la geolocalización',
        duration: 3000
      });
      toast.present();
    })

  }

  loadMarkers(){
    db.getAll().then((results)=>{
      this.transactions = results;
      this.loadTransactionMarkers(this.transactions)
    })
  }

  loadTransactionMarkers(transactions){
    this.transactions.forEach(transaction => {

      if(!transaction.hasLocation()) return;

      let position: LatLng = new LatLng(transaction.lat, transaction.lng);

      let icon: MarkerIcon = {
        url: transaction.getImage(),
        size: {
          width: 128,
          height: 95
        }
      };

      let options: MarkerOptions = {
        position: position,
        icon: icon,
        title: transaction.title
      }

      this.map.addMarker(options).then((marker: Marker) => {
        marker.showInfoWindow();
      });

    });

  }

}
