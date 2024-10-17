import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon , IonList, IonItem, IonThumbnail, IonButton} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, send } from 'ionicons/icons';
import { ImageCardComponent } from './components/image-card/image-card.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonList,
    IonItem,
    IonThumbnail,
    ImageCardComponent,
    IonButton,
  ],
})
export class HomePage {
  constructor() {
    addIcons({add, send})
  }

  photos: string[] = [];

  // Método para tomar una foto usando la cámara
  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Utilizamos DataUrl para mostrar la imagen directamente
        source: CameraSource.Camera // Esto abre directamente la cámara
      });

      // Guardamos la imagen en el array de fotos
      this.photos.push(image.dataUrl!); // unshift agrega al principio de la lista

      console.log(this.photos.length);


    } catch (error) {
      console.error("Error al tomar la foto:", error);
    }
  }

  deletePicture(position: number) {
    this.photos.splice(position,1);
  }
}
