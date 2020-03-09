import { Component, OnInit } from '@angular/core';
import { Food } from '../../models/food'
import { Observable } from 'rxjs';
import { FirebaseService } from '../../services/firebase/firebase.service'

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['../folder.page.scss'],
})
export class FoodPage implements OnInit {
  private foods: Observable<Food[]>; 

  constructor(private fbService: FirebaseService) { }

  ngOnInit(): void {
    this.foods = this.fbService.getFoods();
  }

  
  changeOnStock(id: string, onStock: boolean) {
    this.fbService.updateStock(id,onStock);
  }

}
