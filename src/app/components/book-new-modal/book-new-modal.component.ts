import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, ModalController, IonIcon, IonLabel, IonDatetimeButton, IonModal, IonDatetime, IonInput, IonRow, IonCol, IonTextarea } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-book-new-modal',
  templateUrl: './book-new-modal.component.html',
  styleUrls: ['./book-new-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, ReactiveFormsModule, FormsModule, IonLabel, IonDatetime, IonInput, IonRow, IonCol, IonTextarea],
})
export class BookNewModalComponent  implements OnInit {


  form = new FormGroup({
    title: new FormControl('', [ Validators.required]),
    author: new FormControl('', [Validators.required]),
    readDate: new FormControl(new Date().toISOString(), [Validators.required]),
    review: new FormControl('', [Validators.required]),
    image: new FormControl('', ),
  })

  constructor(
    private modalCtrl: ModalController,
    private router: Router, 
    private dbService: DatabaseService
  ) {
    addIcons({
      closeOutline
    })
   }

  @ViewChild('dateModal', { static: false }) dateModal?: IonModal;

  ngOnInit() {}

  showDatePicker = false;
  tempDate: string | null = null;

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
    if (this.showDatePicker) {
      this.tempDate = this.form.get('readDate')?.value ?? null;
    }
  }

  onDateChange(event: any) {
    this.tempDate = event.detail.value;
  }

  cancelDatePicker() {
    this.showDatePicker = false;
    this.tempDate = null;
  }

  confirmDatePicker() {
    if (this.tempDate) {
      this.form.get('readDate')?.setValue(this.tempDate);
    }
    this.showDatePicker = false;
    this.tempDate = null;
  }

  formatDate(isoString: string | null | undefined): string {
    if (!isoString) return 'Select date';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async saveBook() {
    if (this.form.invalid) {
      return;
    }

    const title = this.form.get('title')!.value as string;
    const author = this.form.get('author')!.value as string;
    const readDate = this.form.get('readDate')!.value as string;
    const review = this.form.get('review')!.value as string;
    const image = "ruta imagen";

    console.log(this.form.value);
    
    const success = await this.dbService.saveBook(
      title,
      author, 
      readDate, 
      review, 
      image
    );

    if (success) {
      console.log('Libro guardado');
      
      this.form.reset();

    } else {
      console.log('Error al guardar el libro');
    }    
  }

}
