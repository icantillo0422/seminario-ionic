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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  validationMessage = {    
    name: [
      { type: 'required', message: 'Necesitamos saber como te llamas 🤗' },
    ],
    last_name: [
      { type: 'required', message: 'Tenemos tu nombre, pero ¿Y tu apellido? 🤔' },
    ],
    document_type: [
      { type: 'required', message: '¿Tienes cedula, tarjeta de identidad o cedula de extrageria...? 🤔' },
    ],
    document_number: [
      { type: 'required', message: 'Vale... Sabemos que tu de documento, pero no tu número... 👀' },
    ],
    career: [
      { type: 'required', message: '¿Que carrera estás estudiando? 🤑' },
    ],
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

  documentTypeList = [
    { id: 'c.c', text: 'Cedula de ciudadania' },
    { id: 't.i', text: 'Tarjeta de identidad' },
    { id: 'c.e', text: 'Cedula de extrangeria' },
  ]

  careerList = [
    { id: 1, text: 'Ingeniería de Sistemas' },
    { id: 2, text: 'Tecnología en Desarrollo de Software' },
    { id: 3, text: 'Ingeniería Electrónica' },
    { id: 4, text: 'Tecnología en Desarrollo en Sistemas Electrónicos' },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private authenticateService: AuthenticateService,
    private navController: NavController,
    private toastController: ToastController,
    private storage: Storage
  ) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([ Validators.required ])),
      last_name: new FormControl('', Validators.compose([ Validators.required ])),
      document_type: new FormControl('', Validators.compose([ Validators.required ])),
      document_number: new FormControl('', Validators.compose([ Validators.required ])),
      career: new FormControl('', Validators.compose([ Validators.required ])),
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

  goToBack() {
    this.navController.navigateBack('/login')
  }

  async register(data: any) {
    try {      
      data.password = btoa(data.password)      
      const res = this.authenticateService.registerUser(data);
  
      if( res.error ) {
        const toast = await this.toastController.create({
  
          message: res.message,
          duration: 1500,
          position: 'bottom'
        });
    
        await toast.present();    
  
        return;
      }

      this.navController.navigateForward('/login');
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
