import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plataforma } from '../models/Plataforma';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PlataformasService {
  // Subject que mantiene el estado actual de las plataformas y permite emitir cambios a los suscriptores.
  private PlataformasSubject = new BehaviorSubject<Plataforma[]>([]);
  // Observable público para que otros componentes puedan suscribirse a los cambios de plataformas.
  Plataformas$ = this.PlataformasSubject.asObservable();
  // URL base para las peticiones HTTP relacionadas con plataformas.
  baseURL = environment.localmanagedUrl+'api/Plataformas';

  constructor(private http: HttpClient) {
    // Al instanciar el servicio, se cargan las plataformas desde el backend.
    this.cargarPlataformas();
  }

  // Método privado que obtiene las plataformas desde el backend y actualiza el Subject.
  private cargarPlataformas(): void {
    this.http.get<Plataforma[]>(this.baseURL).pipe(
      // Transforma los datos recibidos en instancias de la clase Plataforma.
      map(data => data.map(item => new Plataforma(
        item.Id,
        item.nombre,
        item.icon
      )))
    )
    // Actualiza el Subject con la nueva lista de plataformas.
    .subscribe(Plataformas => this.PlataformasSubject.next(Plataformas));
  }

  // Devuelve un observable para que los componentes puedan recibir actualizaciones de la lista de plataformas.
  obtenerPlataformas(): Observable<Plataforma[]> {
    return this.Plataformas$;
  }

  // Busca y devuelve una plataforma por su id desde el estado local (sin hacer petición HTTP).
  obtenerPlataformaPorId(id: string): Plataforma | undefined {
    return this.PlataformasSubject.value.find(tag => tag.Id === id);
  }
}
