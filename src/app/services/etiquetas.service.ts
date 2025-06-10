import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etiqueta } from '../models/Etiqueta';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EtiquetasService {
  private etiquetasSubject = new BehaviorSubject<Etiqueta[]>([]);
  etiquetas$ = this.etiquetasSubject.asObservable();
  baseURL = environment.localmanagedUrl+'api/Etiquetas';

  constructor(private http: HttpClient) {
    this.cargarEtiquetas(); // Carga inicial al instanciar el servicio
  }

  private cargarEtiquetas(): void {
    this.http.get<Etiqueta[]>(this.baseURL).pipe(
      map(data => data.map(item => new Etiqueta(
        item.Id,
        item.tag
      )))
    ).subscribe(etiquetas => this.etiquetasSubject.next(etiquetas));
  }

  // Devuelve observable de todos los etiquetas
  obtenerEtiquetas(): Observable<Etiqueta[]> {
    return this.etiquetas$;
  }

  // Devuelve un etiqueta por id desde la instancia local
  obtenerEtiquetaPorId(id: string): Etiqueta | undefined {
    return this.etiquetasSubject.value.find(tag => tag.Id === id);
  }
}
