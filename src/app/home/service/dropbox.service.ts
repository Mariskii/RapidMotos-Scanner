import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropboxService {

  constructor(private httpClient: HttpClient) { }

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post<string>('https://rapidmotosphoto-ap0i-production.up.railway.app/api/dropbox/upload', formData,{
      responseType: 'text' as 'json'  // Indica que la respuesta es de tipo texto
    });
  }
}
