import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonNote } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonNote]
})
export class MoviesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  movies: Movie[] = [
      {
        title: 'Morir en el intento',
        protagonist: 'Lee Child',
        viewDate: new Date('2026-01-01'),
        publicationYear: new Date('2020-05-10'),
        review: 'Un libro intenso y reflexivo.',
        image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      },
      {
        title: 'El camino oculto',
        protagonist: 'Juan Pérez',
        viewDate: new Date('2025-12-15'),
        publicationYear: new Date('2018-03-20'),
        review: 'Una historia misteriosa.',
        image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      }
    ];

}
