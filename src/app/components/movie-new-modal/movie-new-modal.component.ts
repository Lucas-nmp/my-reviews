import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, ModalController, IonIcon, IonLabel, IonDatetimeButton, IonModal, IonDatetime, IonInput, IonRow, IonCol, IonTextarea } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { DatabaseService } from 'src/app/services/database.service';


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

  constructor(
    private modalCtrl: ModalController,
    private dbService: DatabaseService
  ) {
    addIcons({
      closeOutline
    })
   }

  ngOnInit() {}

  @ViewChild('viewDateModal', { static: false }) viewDateModal?: IonModal;
  @ViewChild('publicationYearModal', { static: false }) publicationYearModal?: IonModal;

  onViewDateSelected(event: any) {
    const value = event.detail.value; 
    this.form.get('viewDate')?.setValue(value);
    if (this.viewDateModal && typeof this.viewDateModal.dismiss === 'function') {
      this.viewDateModal.dismiss();
    }
  }

  onPublicationYearSelected(event: any) {
    const value = event.detail.value; 
    this.form.get('publicationYear')?.setValue(value);
    if (this.publicationYearModal && typeof this.publicationYearModal.dismiss === 'function') {
      this.publicationYearModal.dismiss();
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async saveMovie() {
    if (this.form.invalid) {
      return;
    }

    const title = this.form.get('title')!.value as string;
    const protagonist = this.form.get('protagonist')!.value as string;
    const viewDate = this.form.get('viewDate')!.value as string;
    const publicationYear = this.form.get('publicationYear')!.value as string;
    const review = this.form.get('review')!.value as string;
    const image = "ruta imagen";

    console.log(this.form.value);
    
    const success = await this.dbService.saveMovie(
      title,
      protagonist, 
      viewDate, 
      publicationYear,
      review, 
      image
    );

    if (success) {
      console.log('Pelicula guardado');
      
      this.form.reset();

    } else {
      console.log('Error al guardar la pelicula'); 
    }    
  }

}
