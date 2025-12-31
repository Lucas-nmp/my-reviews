import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, ModalController, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-book-new-modal',
  templateUrl: './book-new-modal.component.html',
  styleUrls: ['./book-new-modal.component.scss'],
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon],
})
export class BookNewModalComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) {
    addIcons({
      closeOutline
    })
   }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

}
