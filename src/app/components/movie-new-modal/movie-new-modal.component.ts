import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  ModalController,
  IonIcon,
  IonLabel,
  IonDatetime,
  IonInput,
  IonRow,
  IonCol,
  IonTextarea,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-movie-new-modal',
  templateUrl: './movie-new-modal.component.html',
  styleUrls: ['./movie-new-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    ReactiveFormsModule,
    FormsModule,
    IonLabel,
    IonDatetime,
    IonInput,
    IonRow,
    IonCol,
    IonTextarea,
  ],
})
export class MovieNewModalComponent implements OnInit {

  private selectedImagePath: string = '';
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    protagonist: new FormControl('', [Validators.required]),
    viewDate: new FormControl(new Date().toISOString(), [Validators.required]),
    review: new FormControl('', [Validators.required]),
    image: new FormControl(''),
  });

  constructor(
    private modalCtrl: ModalController,
    private dbService: DatabaseService
  ) {
    addIcons({
      closeOutline,
    });
  }

  ngOnInit() {}

  showDatePicker = false;
  tempDate: string | null = null;

  /*@ViewChild('viewDateModal', { static: false }) viewDateModal?: IonModal;
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
  */

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
    if (this.showDatePicker) {
      this.tempDate = this.form.get('viewDate')?.value ?? null;
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
      this.form.get('viewDate')?.setValue(this.tempDate);
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
      day: 'numeric',
    });
  }

  async close() {
    await this.modalCtrl.dismiss({
      movieSaved: false
    });
  }

  async saveMovie() {
    if (this.form.invalid) {
      return;
    }

    const title = this.form.get('title')!.value as string;
    const protagonist = this.form.get('protagonist')!.value as string;
    const viewDate = this.form.get('viewDate')!.value as string;
    const review = this.form.get('review')!.value as string;
    const image = this.selectedImagePath || '';

    console.log(this.form.value);

    const success = await this.dbService.saveMovie(
      title,
      protagonist,
      viewDate,
      review,
      image
    );

    if (success) {
      console.log('Pelicula guardada');

      this.form.reset();
      this.selectedImagePath = '';
      // Cerrar el modal y pasar información de que se guardó
      await this.modalCtrl.dismiss({
        movieSaved: true
      });

    } else {
      console.log('Error al guardar la pelicula');
    }
  }

  async selectImage() {
    try {
      // Seleccionar imagen de la galería
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos // Usar CameraSource.Camera para tomar foto
      });

      if (image.path) {
        // Guardar la imagen en el almacenamiento permanente de la app
        const savedImage = await this.saveImageToAppStorage(image.path);
        this.selectedImagePath = savedImage;
        console.log('Imagen guardada en:', this.selectedImagePath);
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
    }
  }

  async saveImageToAppStorage(imagePath: string): Promise<string> {
    try {
      // Leer el archivo como base64
      const imageData = await Filesystem.readFile({
        path: imagePath
      });

      // Generar nombre único para la imagen
      const fileName = `movie_${new Date().getTime()}.jpeg`;

      // Guardar en el directorio de datos de la app
      const savedFile = await Filesystem.writeFile({
        path: `movies/${fileName}`,
        data: imageData.data,
        directory: Directory.Data,
        recursive: true // Crea el directorio si no existe
      });

      // Retornar la ruta relativa que se guardará en la BD
      return `movies/${fileName}`;
    } catch (error) {
      console.error('Error al guardar imagen:', error);
      throw error;
    }
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
}
