import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonInput, IonInputPasswordToggle, IonRow, IonCol, IonButton, IonIcon, IonText } from '@ionic/angular/standalone';
import { Router, RouterLink  } from '@angular/router';
import { addIcons } from 'ionicons';
import { enterOutline, fingerPrint } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, RouterLink, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonLabel, IonInput, IonInputPasswordToggle, IonRow, IonCol, IonButton, IonIcon]
})
export class LoginPage implements OnInit {


  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private router: Router
  ) {
    addIcons({
      enterOutline, fingerPrint
    })
   }

  ngOnInit() {
  }

  submit() {
    if(this.form.valid) {
      this.router.navigateByUrl('/main');
    }
  }

}
