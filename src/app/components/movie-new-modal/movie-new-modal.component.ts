import { Component, OnInit } from '@angular/core';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-movie-new-modal',
  templateUrl: './movie-new-modal.component.html',
  styleUrls: ['./movie-new-modal.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonIcon],
})
export class MovieNewModalComponent  implements OnInit {

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
