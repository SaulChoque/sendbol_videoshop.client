import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  baseURL = 'http://localhost:5007/api/Usuarios';

  createUser(formData: any) {
    return this.http.post(this.baseURL, formData);
  }


  //CMMT EXPLN Se usa el HttpClient para hacer una peticion GET al servidor para verificar si el correo existe
  correoExists(formCorreoData: string) {
    return this.http.get(`${this.baseURL}/exists/${formCorreoData}`);
  }

}

