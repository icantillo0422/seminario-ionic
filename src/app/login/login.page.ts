import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validationMessage = {    
    email: [
      { type: 'required', message: 'El correo es requerido 🙄' },
      { type: 'pattern', message: 'Por favor escribe un correo valido 😡' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es necesaria 😬' },
      {
        type: 'minlength',
        message: 'Ingresa una contraseña con mas de 5 caracteres 😉',
      },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private authenticateService: AuthenticateService,
    private navController: NavController,
    private toastController: ToastController,
    private storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z-.]{2,4}$'
          ),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
    });
  }

  ngOnInit(): void {}

  goToRegister() {
    this.navController.navigateForward('/register')
  }

  async login(data: any) {
    try {
      await this.authenticateService.loginUser(data);

      this.storage.set('isLogin', true)
      this.navController.navigateForward('/menu')

    } catch (error: any) {
      const toast = await this.toastController.create({

        message: error.message,
        duration: 1500,
        position: 'bottom'
      });
  
      await toast.present();      
    }
  }  
}
