import { Component, inject, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon , IonList, IonItem, IonThumbnail, IonButton,IonLoading, ToastController, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { DropboxService } from './service/dropbox.service';
import { catchError, of } from 'rxjs';

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
    IonLoading,
  ],
})
export class HomePage implements OnInit {

  dropboxService = inject(DropboxService);
  toastController = inject(ToastController);
  alertController = inject(AlertController);

  uploadingFhoto:boolean = false;

  constructor() {
    addIcons({cameraOutline})
  }

  ngOnInit(): void {
    this.requestCameraPermissions().then(granted => {
      if (granted) {
        this.takePicture();
      } else {
        console.error("Permisos de cámara no concedidos");
      }
    });
  }

  async requestCameraPermissions() {
    const status = await Camera.requestPermissions({ permissions: ['camera'] });
    return status.camera === 'granted';
  }

  photos: File[] = [];

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      if (image.webPath) {
        const response = await fetch(image.webPath);
        const blob = await response.blob();

        const file = new File([blob], 'photo.jpg', { type: blob.type });

        //this.uploadingFhoto = true;
        this.dropboxService.uploadFile(file).pipe(
          catchError(err => {
            console.log(err);
            this.uploadingFhoto = false;
            this.presentAlert()
            this.takePicture();
            return of()
          })
        ).subscribe(
          (response) => {
            this.uploadingFhoto = false;
            this.presentToast('La imagen ha sido subida correctamente');
          },
        );

        this.takePicture();
      }

    } catch (error) {
      console.error("Error al tomar la foto:", error);
    }
  }

  async presentToast(text:string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'No se ha podido subir la imagen a la nube',
      buttons: ['Ok'],
    });

    await alert.present();
  }
}
