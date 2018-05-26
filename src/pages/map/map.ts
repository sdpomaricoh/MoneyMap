import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  title: string;
  constructor(public navCtrl: NavController) {
    this.title = "Sobre nosotros";
  }

}
