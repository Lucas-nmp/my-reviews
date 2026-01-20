import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonNote, ModalController } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { Movie } from 'src/app/models/movie.model';
import { MovieDetailModalComponent } from 'src/app/components/movie-detail-modal/movie-detail-modal.component';
import { MovieNewModalComponent } from 'src/app/components/movie-new-modal/movie-new-modal.component';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonNote]
})
export class MoviesPage implements OnInit {

  movies: Movie[] = [];

  constructor(private modalCtrl: ModalController, private dbService: DatabaseService) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies() {
     const movies = await this.dbService.getAllMovies();

    // Cargar las URLs de las imágenes
    for (let movie of movies) {
      if (movie.image) {
        movie.image = await this.getImageUrl(movie.image);
      }
    }
    
    this.movies = movies;
  }

  // Método para recuperar la imagen desde la BD y mostrarla 
  async getImageUrl(imagePath: string): Promise<string> {
    if (!imagePath) {
      return ''; // o una imagen placeholder
    }

    try {
      const file = await Filesystem.readFile({
        path: imagePath,
        directory: Directory.Data
      });

      // Convertir a base64 URL para mostrar en el HTML
      return `data:image/jpeg;base64,${file.data}`;
    } catch (error) {
      console.error('Error al leer imagen:', error);
      return '';
    }
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

}
