import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'cleanness',
    loadChildren: () => import('./components/cleanness/cleanness.module').then( m => m.CleannessPageModule)
  },
  {
    path: 'wish',
    loadChildren: () => import('./components/wish/wish.module').then( m => m.WishPageModule)
  },
  {
    path: 'food',
    loadChildren: () => import('./components/food/food.module').then( m => m.FoodPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./authentication/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'client-profile',
    loadChildren: () => import('./components/client-profile/client-profile.module').then( m => m.ClientProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
