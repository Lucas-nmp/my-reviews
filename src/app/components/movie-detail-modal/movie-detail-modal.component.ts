import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, ModalController, IonContent, IonCard, IonCardContent, IonImg } from "@ionic/angular/standalone";
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-detail-modal',
  templateUrl: './movie-detail-modal.component.html',
  styleUrls: ['./movie-detail-modal.component.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, CommonModule, IonContent, IonCard, IonCardContent, IonImg],
})
export class MovieDetailModalComponent  implements OnInit {

  @Input() movie!: Movie;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

}
