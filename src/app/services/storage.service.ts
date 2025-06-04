import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  baseURL = environment.localmanagedUrl+'api/Storage';

  constructor(private http: HttpClient) {}

  getImageUrl(filename: string): string {
    // Devuelve la URL del endpoint que sirve la imagen
    return `${this.baseURL}?filename=${encodeURIComponent(filename)}`;
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.baseURL, formData);
  }
}
