import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, ModalController, IonIcon, IonLabel, IonDatetimeButton, IonModal, IonDatetime, IonInput, IonRow, IonCol, IonTextarea } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';


@Component({
  selector: 'app-movie-new-modal',
  templateUrl: './movie-new-modal.component.html',
  styleUrls: ['./movie-new-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, ReactiveFormsModule, FormsModule, IonLabel, IonDatetimeButton, IonModal, IonDatetime, IonInput, IonRow, IonCol, IonTextarea],
})
export class MovieNewModalComponent  implements OnInit {
 
    form = new FormGroup({
    title: new FormControl('', [ Validators.required]),
    protagonist: new FormControl('', [Validators.required]),
    viewDate: new FormControl(new Date().toISOString(), [Validators.required]),
    publicationYear: new FormControl(new Date().toISOString(), [Validators.required]),
    review: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })

  constructor(private modalCtrl: ModalController) {
    addIcons({
      closeOutline
    })
   }

  ngOnInit() {}

  @ViewChild('viewDateModal', { static: false }) viewDateModal?: IonModal;
  @ViewChild('publicationYearModal', { static: false }) publicationYearModal?: IonModal;

  onViewDateSelected() {
    if (this.viewDateModal && typeof this.viewDateModal.dismiss === 'function') {
      this.viewDateModal.dismiss();
    }
  }

  onPublicationYearSelected() {
    if (this.publicationYearModal && typeof this.publicationYearModal.dismiss === 'function') {
      this.publicationYearModal.dismiss();
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
