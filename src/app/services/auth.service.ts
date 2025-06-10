import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  baseURL = environment.localmanagedUrl+'api/Usuarios';

  createUser(usuario?: Usuario) {
    if (usuario) {
      const usuarioJson = JSON.stringify(usuario); // Convertir el objeto a JSON
      //console.log('Usuario JSON:', usuarioJson); // Imprimir en consola
    }
    return this.http.post(this.baseURL, usuario);


  }


  loginUser(usuario: Usuario) {
    const usuarioJson = JSON.stringify(usuario); // Convertir el objeto a JSON
    //console.log('Usuario JSON:', usuarioJson); // Imprimir en consola
    return this.http.post(`${this.baseURL}/login`, usuario, { withCredentials: true });
  }


  getSessionUser() {
    return this.http.get(`${this.baseURL}/session-user`, { withCredentials: true });
  }

  logout() {
    return this.http.post(`${this.baseURL}/logout`, {}, { withCredentials: true });
  }

  //CMMT EXPLN Se usa el HttpClient para hacer una peticion GET al servidor para verificar si el correo existe
  correoExists(formCorreoData: string) {
    return this.http.get(`${this.baseURL}/exists/${formCorreoData}`);
  }

}

