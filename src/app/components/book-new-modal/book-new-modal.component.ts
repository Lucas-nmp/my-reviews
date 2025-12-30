import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, ModalController } from "@ionic/angular/standalone";

@Component({
  selector: 'app-book-new-modal',
  templateUrl: './book-new-modal.component.html',
  styleUrls: ['./book-new-modal.component.scss'],
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton],
})
export class BookNewModalComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

}
