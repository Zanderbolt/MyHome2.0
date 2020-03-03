import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  //Variable para el formulario de registro
  registerForm: FormGroup;

  constructor(private router: Router, private userAuth: AngularFireAuth,
    private realtimeDatabase: AngularFireDatabase,
    private formBuilder: FormBuilder,
    private nativeToast: ToastController) { }

  ngOnInit() {
    //Inicializando formulario de Registro
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  // Crear nuevos Usuarios
  async createUser() {
    // Extrayendo datos del formulario
    const userName = this.registerForm.value.userName;
    const userEmail = this.registerForm.value.userEmail;
    const userPassword = this.registerForm.value.userPassword;

    // Creando usuarios en el sistema
    await this.userAuth.auth.createUserWithEmailAndPassword(userEmail, userPassword)

      //En caso de un registro correcto se ejecuta los iguiente
      .then(async () => {
        //Modificando objeto del usuario
        this.userAuth.auth.onAuthStateChanged((userData) => {
          userData.updateProfile({
            displayName: userName,
          });
        });


        // Extrayendo User ID
        const userID = this.userAuth.auth.currentUser.uid;

        //Creando registro en la BDD
        this.realtimeDatabase.database.ref('MyHomeAppSystem/users/' + userID + '/').set({
          userName: userName,
          userEmail: userEmail,
          userUID: userID,
          prueba: '',
        })

        //Notificar al usuario de un registro exitoso
        const registerToast = await this.nativeToast.create({
          message: 'Registro exitoso',
          position: "bottom",
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                //Enviando correo de verificación
                this.userAuth.auth.currentUser.sendEmailVerification();

                //Redireccionando al usuario al Login...
                this.router.navigate(['/login']);
              }
            }
          ]
        });
        registerToast.present();

      })

      //En caso de registro con problema se ejecutará este códigoF
      .catch(async (error) => {
        const errorCodes = error.code;
        switch (errorCodes) {
          case 'auth/invalid-email':
            const invalidEmailToast = await this.nativeToast.create({
              message: "Dirección de correo inválida",
              buttons: ['Aceptar']
            });
            invalidEmailToast.present();
            break;
          case 'auth/email-already-in-use':
            const emailInUseToast = await this.nativeToast.create({
              message: "Correo en uso",
              buttons: ['Aceptar']
            });
            emailInUseToast.present();
            break;
          case 'auth/operation-not-allowed':
            const operationNotAllowedToast = await this.nativeToast.create({
              message: "Registro inhabilitado",
              buttons: ['Aceptar']
            });
            operationNotAllowedToast.present();
            break;
          case 'auth/weak-password':
            const weakPasswordToast = await this.nativeToast.create({
              message: "Contraseña débil",
              buttons: ['Aceptar']
            });
            weakPasswordToast.present();
            break;
        }
      });

    const currentUser = this.userAuth.auth.currentUser;
    console.log(currentUser);

  }

  // Navegar al Login
  goToLogIn() {

  }

}
