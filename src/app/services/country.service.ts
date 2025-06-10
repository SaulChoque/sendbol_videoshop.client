import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getCountries } from "@yusifaliyevpro/countries";
export interface Country {
  name: string; // Nombre del país
  code: string; // Código del país
  flag: string; // URL de la bandera
  currency?: string; // Moneda del país (opcional)
}



@Injectable({
  providedIn: 'root',
})


export class CountryService {
  private CountriesSubject = new BehaviorSubject<Country[]>([]);
  // Observable público para que otros componentes puedan suscribirse a los cambios de plataformas.
  Countries$ = this.CountriesSubject.asObservable();
  private apiUrl = 'https://restcountries.com/v3.1/all'; // URL de la nueva API de países




    constructor(private http: HttpClient) {
    // Llama a cargarCountries y actualiza el BehaviorSubject cuando los datos estén listos
    this.cargarCountries().then(countries => {
      this.CountriesSubject.next(countries);
    });
  }


  private async cargarCountries(): Promise<Country[]> {
    const data = await getCountries({
      fields: ["name", "translations", "cca2", "flag", "currencies"],
    });
    //console.log('Countries data:', data);
    const countries: Country[] = (data ?? []).map((country) => ({
      name: country.translations?.spa?.common ?? (typeof country.name === 'string' ? country.name : country.name?.common ?? 'Desconocido'),
      code: country.cca2,
      flag: country.flag,
      currency: country.currencies ? Object.keys(country.currencies)[0] : undefined, // Extrae la primera moneda si existe
    }))
    //console.log('Processed countries:', countries);
    .sort((a, b) => a.name.localeCompare(b.name));
    return countries;
  }

  // Método para obtener la lista de países
  getCountries(): Observable<Country[]> {
    return this.Countries$;
  }
  /*
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
    */
}
