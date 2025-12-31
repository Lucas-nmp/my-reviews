import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonLabel, IonInput, IonInputPasswordToggle, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, ReactiveFormsModule, CommonModule, FormsModule, HeaderComponent, IonLabel, IonInputPasswordToggle, IonButton]
})
export class RegisterPage implements OnInit {

  

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
  })

  constructor(
    private dbService: DatabaseService, 
    private router: Router
  ) { }

  async register() {
    if (this.form.invalid) {
      return;
    }

    const userName = this.form.get('userName')!.value as string;
    const email = this.form.get('email')!.value as string;
    const password = this.form.get('password')!.value as string;

    const success = await this.dbService.registerUser(
      userName,
      email,
      password
    );

    if (success) {
      console.log('Usuario registrado');
      this.router.navigateByUrl('/login');
    } else {
      console.log('Error al registrar usuario');
    }
  }

  ngOnInit() {
  }

}
