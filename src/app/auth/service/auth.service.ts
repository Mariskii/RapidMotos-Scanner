import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../interfaces/LoginUser.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(user: LoginUser) {
    return this.httpClient.post<LoginUser>(`https://rapidmotosphoto-ap0i-production.up.railway.app/api/auth/log-in`,user);
  }
}
