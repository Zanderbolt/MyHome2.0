import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFoodPageRoutingModule } from './view-food-routing.module';

import { ViewFoodPage } from './view-food.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFoodPageRoutingModule
  ],
  declarations: [ViewFoodPage]
})
export class ViewFoodPageModule {}
