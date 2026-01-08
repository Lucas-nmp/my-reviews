import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, ModalController, IonIcon, IonLabel, IonDatetimeButton, IonModal, IonDatetime, IonInput, IonRow, IonCol, IonTextarea } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-book-new-modal',
  templateUrl: './book-new-modal.component.html',
  styleUrls: ['./book-new-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, ReactiveFormsModule, FormsModule, IonLabel, IonDatetimeButton, IonModal, IonDatetime, IonInput, IonRow, IonCol, IonTextarea],
})
export class BookNewModalComponent  implements OnInit {


  form = new FormGroup({
    title: new FormControl('', [ Validators.required]),
    author: new FormControl('', [Validators.required]),
    readDate: new FormControl(new Date().toISOString(), [Validators.required]),
    review: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })

  constructor(private modalCtrl: ModalController) {
    addIcons({
      closeOutline
    })
   }

  @ViewChild('dateModal', { static: false }) dateModal?: IonModal;

  ngOnInit() {}

  onDateSelected() {
    if (this.dateModal && typeof this.dateModal.dismiss === 'function') {
      this.dateModal.dismiss();
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
