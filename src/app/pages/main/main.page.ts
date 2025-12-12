import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,  IonRow, IonCol, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { bookOutline, personOutline, filmOutline, logOutOutline, settingsOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { HeaderComponent } from "src/app/components/header/header.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonContent,  RouterLink,  CommonModule, FormsModule, IonRow, IonCol, IonIcon, HeaderComponent]
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
