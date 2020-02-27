import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CleannessPage } from './cleanness.page';

const routes: Routes = [
  {
    path: '',
    component: CleannessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CleannessPageRoutingModule {}
