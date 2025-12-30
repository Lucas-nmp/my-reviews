import { Component, Input, OnInit } from '@angular/core';

import { Book } from 'src/app/models/book.model';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonCard, IonCardContent, IonImg, ModalController, IonTitle } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail-modal',
  templateUrl: './book-detail-modal.component.html',
  styleUrls: ['./book-detail-modal.component.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonCard, IonCardContent, IonImg, CommonModule, IonTitle],
})
export class BookDetailModalComponent  implements OnInit {

  @Input() book!: Book;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

}
