import { Component, OnInit } from '@angular/core';
import { IonInput, IonContent,IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person, lockClosed } from 'ionicons/icons';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  standalone: true,
  imports: [
    IonInput,
    IonContent,
    IonButton,
    IonIcon,
  ],
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent  implements OnInit {

  constructor() {
    addIcons({person, lockClosed})
  }

  ngOnInit() {}

}
