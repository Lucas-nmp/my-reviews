import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonRow, IonCol, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { bookOutline, personOutline, filmOutline, logOutOutline, settingsOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, RouterLink, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonRow, IonCol, IonIcon]
})
export class MainPage implements OnInit {

  constructor() {
    addIcons ({
      bookOutline, personOutline, filmOutline, logOutOutline, settingsOutline
    })
   }

  ngOnInit() {
  }

}
