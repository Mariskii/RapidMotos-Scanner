import { Component, Input, OnInit } from '@angular/core';
import { IonIcon , IonButton} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  standalone: true,
  styleUrls: ['./image-card.component.scss'],
  imports: [
    IonIcon,
    IonButton
  ]
})
export class ImageCardComponent  implements OnInit {

  @Input() image!: string;

  constructor() {
    addIcons({ trash });
   }

  ngOnInit() {}

}
