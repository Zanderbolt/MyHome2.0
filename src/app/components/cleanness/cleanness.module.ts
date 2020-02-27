import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CleannessPageRoutingModule } from './cleanness-routing.module';

import { CleannessPage } from './cleanness.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CleannessPageRoutingModule
  ],
  declarations: [CleannessPage]
})
export class CleannessPageModule {}
