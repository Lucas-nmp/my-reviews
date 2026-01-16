import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonNote, ModalController } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { Movie } from 'src/app/models/movie.model';
import { MovieDetailModalComponent } from 'src/app/components/movie-detail-modal/movie-detail-modal.component';
import { MovieNewModalComponent } from 'src/app/components/movie-new-modal/movie-new-modal.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonNote]
})
export class MoviesPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openMovie(movie: Movie) {
    const modal = await this.modalCtrl.create({
      component: MovieDetailModalComponent,
      componentProps: {
        movie: movie,
      },
    });

    await modal.present();
  }

  async newMovie() {
    const modal = await this.modalCtrl.create({
      component: MovieNewModalComponent
    });
    
    await modal.present();
  }

  movies: Movie[] = [
      {
        id: 1,
        title: 'Morir en el intento',
        protagonist: 'Lee Child',
        viewDate: new Date('2026-01-01'),
        review: 'Un libro intenso y reflexivo.',
        image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      },
      {
        id: 2,
        title: 'El camino oculto',
        protagonist: 'Juan Pérez',
        viewDate: new Date('2025-12-15'),
        review: 'Una historia misteriosa.',
        image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      }
    ];

}
