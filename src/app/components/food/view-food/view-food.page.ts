import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AlertController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-view-food',
  templateUrl: './view-food.page.html',
  styleUrls: ['./view-food.page.scss'],
})
export class ViewFoodPage implements OnInit, AfterViewInit {
  food: Food = {
    description: '',
    price: 0,
    need: false,
  };

  editMode: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fbService: FirebaseService,
    private router: Router,
    private alertController : AlertController,
    private toastController : ToastController
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.fbService.getFood(id).subscribe(foodData => {
        this.food = foodData;
      });
    }
  }

  deleteFood(id: string) {
    this.presentAlertConfirmDELETE(id);
  }

  enableEdit() {
    // this.presentAlertConfirm();
    if (this.editMode) {
    this.editMode = false
      console.log("Cambia a false")
    }
    else { this.editMode = true 
      console.log("Cambia a true")}

  }

  updateFood(id: string) {
    this.enableEdit();    
    this.updatedFoodToastr()
    this.fbService.updateFood(this.food);
    this.return();
  }

  //DIALOG BOX para confirmar DELETE
  async presentAlertConfirmDELETE(id: string) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'You Sure want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'primary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deletedFoodToastr();
            this.return();
            this.fbService.deleteFood(id);
          }
        }
      ]
    });

    await alert.present();

  }

  //TOAST para borrado exitoso
  async deletedFoodToastr() {
    const toast = await this.toastController.create({
      message: 'Item Deleted.',
      color: 'danger',
      duration: 2000,
      buttons : [
        {
          side: 'start',
          icon: 'trash',        
        }
      ]
    });
    toast.present();
  }

  //TOAST para borrado exitoso
  async updatedFoodToastr() {
    const toast = await this.toastController.create({
      message: 'Item Updated.',
      color: 'success',
      duration: 2000,
      buttons : [
        {
          side: 'start',
          icon: 'checkmark',        
        }
      ]
    });
    toast.present();
  }

  
  return() {
    this.router.navigateByUrl('/food');
  }

}
