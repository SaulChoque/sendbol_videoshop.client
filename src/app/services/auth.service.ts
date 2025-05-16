import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  baseURL = 'https://localhost:7053/api/Usuarios';

  createUser(usuario?: Usuario) {
    if (usuario) {
      const usuarioJson = JSON.stringify(usuario); // Convertir el objeto a JSON
      console.log('Usuario JSON:', usuarioJson); // Imprimir en consola
    }
    return this.http.post(this.baseURL, usuario);

    
  }
  //CMMT EXPLN Se usa el HttpClient para hacer una peticion GET al servidor para verificar si el correo existe
  correoExists(formCorreoData: string) {
    return this.http.get(`${this.baseURL}/exists/${formCorreoData}`);
  }

}

