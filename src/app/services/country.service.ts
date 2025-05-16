import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Country {
  name: string; // Nombre del país
  code: string; // Código del país
  flag: string; // URL de la bandera
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all'; // URL de la nueva API de países

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de países
  getCountries(): Observable<Country[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data) =>
        data.map((country) => ({
          name: country.name.common, // Nombre común del país
          code: country.cca2, // Código de dos letras del país
          flag: country.flags?.png || '', // URL de la bandera en formato PNG
        }))
      )
    );
  }
}
