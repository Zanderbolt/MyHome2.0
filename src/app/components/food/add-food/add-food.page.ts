import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.page.html',
  styleUrls: ['./add-food.page.scss'],
})
export class AddFoodPage implements OnInit {
  dateFormat = require('dateformat');
  now = new Date().toLocaleDateString();


  food: Food = {
    description: '',
    price: null,
    need: false,
    date: this.now,
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fbService: FirebaseService,
    private toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  addFood() {
    this.fbService.addFood(this.food).then(() => {
      this.router.navigateByUrl('/food');
      this.addNewFoodToastr();
      this.food = {
        description: '',
        price: 0,
        need: false,
      }
    }, err => {
      console.log("error")
    });

  }

  return() {
    this.router.navigateByUrl('/food');
  }

  //TOASTR para agregado exitoso
  async addNewFoodToastr() {
    const toast = await this.toastController.create({
      message: 'Item Added',
      color: 'success',
      duration: 1000,
      buttons: [
        {
          side: 'start',
          icon: 'checkmark',
        }
      ]
    });
    toast.present();
  }


}
