import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plataforma } from '../models/Plataforma';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlataformasService {
  private PlataformasSubject = new BehaviorSubject<Plataforma[]>([]);
  Plataformas$ = this.PlataformasSubject.asObservable();
  baseURL = 'https://localhost:7053/api/Plataformas';

  constructor(private http: HttpClient) {
    this.cargarPlataformas(); // Carga inicial al instanciar el servicio
  }

  private cargarPlataformas(): void {
    this.http.get<Plataforma[]>(this.baseURL).pipe(
      map(data => data.map(item => new Plataforma(
        item.Id,
        item.nombre,
        item.icon
      )))
    ).subscribe(Plataformas => this.PlataformasSubject.next(Plataformas));
  }

  // Devuelve observable de todos los Plataformas
  obtenerPlataformas(): Observable<Plataforma[]> {
    return this.Plataformas$;
  }

  // Devuelve un Plataforma por id desde la instancia local
  obtenerPlataformaPorId(id: string): Plataforma | undefined {
    return this.PlataformasSubject.value.find(tag => tag.Id === id);
  }
}
