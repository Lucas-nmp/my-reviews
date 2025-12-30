import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonContent, IonButton, IonNote } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/components/header/header.component";
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonContent, IonButton, IonNote]
})
export class BooksPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  books: Book[] = [
    {
      title: 'Morir en el intento',
      author: 'Lee Child',
      readDate: new Date('2026-01-01'),
      publicationDate: new Date('2020-05-10'),
      review: 'Un libro intenso y reflexivo.',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      title: 'El camino oculto',
      author: 'Juan Pérez',
      readDate: new Date('2025-12-15'),
      publicationDate: new Date('2018-03-20'),
      review: 'Una historia misteriosa.',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    }
  ];

}
