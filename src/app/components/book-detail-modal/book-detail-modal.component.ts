import { Component, Input, OnInit } from '@angular/core';

import { Book } from 'src/app/models/book.model';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonCard, IonCardContent, IonImg, ModalController, IonTitle, IonIcon } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-book-detail-modal',
  templateUrl: './book-detail-modal.component.html',
  styleUrls: ['./book-detail-modal.component.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonCard, IonCardContent, IonImg, CommonModule, IonTitle, IonIcon],
})
export class BookDetailModalComponent  implements OnInit {

  @Input() book!: Book;

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
