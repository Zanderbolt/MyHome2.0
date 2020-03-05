import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodPage } from './food.page';

const routes: Routes = [
  {
    path: '',
    component: FoodPage
  },
  {
    path: 'add-food',
    loadChildren: () => import('./add-food/add-food.module').then( m => m.AddFoodPageModule)
  },
  {
    path: 'view-food',
    loadChildren: () => import('./view-food/view-food.module').then( m => m.ViewFoodPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodPageRoutingModule {}
