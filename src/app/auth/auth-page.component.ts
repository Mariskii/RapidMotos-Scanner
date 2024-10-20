import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput, IonContent,IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person, lockClosed } from 'ionicons/icons';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { LoginUser } from './interfaces/LoginUser.interface';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  standalone: true,
  imports: [
    IonInput,
    IonContent,
    IonButton,
    IonIcon,
    ReactiveFormsModule,
  ],
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  failedLogin:boolean = false;

  formLogin = this.fb.group({
      userName: ['',[Validators.required]],
      password: ['',[Validators.required]],
  });

  constructor() {
    addIcons({person, lockClosed})
  }

  login() {

    if(this.formLogin.valid) {

      const user: LoginUser = {
        username: this.formLogin.get('userName')!.value!,
        password: this.formLogin.get('password')!.value!,
      }

      this.authService.login(user).pipe(
        catchError(error => {
          this.failedLogin = true;
          return of(error);
      })
      )
      .subscribe(res => {
        this.failedLogin = false;

        if(res.status === 'success') {
          localStorage.setItem('accessToken',res.accessToken);
          this.router.navigate(['/home']);
        } else {
          this.failedLogin = true;
        }
      });
    } else {
      this.formLogin.get('userName')?.markAsDirty();
      this.formLogin.get('password')?.markAsDirty();
    }
  }

}
