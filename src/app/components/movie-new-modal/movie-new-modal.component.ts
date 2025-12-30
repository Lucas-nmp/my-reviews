import { Component, OnInit } from '@angular/core';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-movie-new-modal',
  templateUrl: './movie-new-modal.component.html',
  styleUrls: ['./movie-new-modal.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent],
})
export class MovieNewModalComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

}
