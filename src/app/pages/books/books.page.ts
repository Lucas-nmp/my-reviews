import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonContent, IonButton, IonNote, ModalController } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { Book } from 'src/app/models/book.model';
import { DatabaseService } from 'src/app/services/database.service';
import { BookDetailModalComponent } from 'src/app/components/book-detail-modal/book-detail-modal.component';
import { BookNewModalComponent } from 'src/app/components/book-new-modal/book-new-modal.component';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonContent, IonButton, IonNote]
})
export class BooksPage implements OnInit {
  books: Book[] = [];

  constructor(private modalCtrl: ModalController, private dbService: DatabaseService) { }

  ngOnInit() {
    this.loadBooks();
  }

  async loadBooks() {
     const books = await this.dbService.getAllBooks();

    // Cargar las URLs de las imágenes
    for (let book of books) {
      if (book.image) {
        book.image = await this.getImageUrl(book.image);
      }
    }
    
    this.books = books;
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

  async openBook(book: Book) {
    const modal = await this.modalCtrl.create({
      component: BookDetailModalComponent,
      componentProps: {
        book: book,
      },
    });

    await modal.present();
  }

  async newBook() {
    const modal = await this.modalCtrl.create({
      component: BookNewModalComponent
    });
    
    await modal.present();
  }

}
