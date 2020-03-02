import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  //Funciones para navegar en la App
  goToLogIn() {
    this.router.navigate(['/login']);
  }
  //Funciones para navegar en la App
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
