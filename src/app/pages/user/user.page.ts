import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonLabel, IonInput, IonInputPasswordToggle, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, ReactiveFormsModule, CommonModule, FormsModule, HeaderComponent, IonLabel, IonInputPasswordToggle, IonButton]
})
export class UserPage implements OnInit {

    form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
    })

  constructor() { }

  ngOnInit() {
  }

}
