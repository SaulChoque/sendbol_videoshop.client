import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chiptag } from '../models/Chiptag';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChiptagsService {
  private chiptagsSubject = new BehaviorSubject<Chiptag[]>([]);
  chiptags$ = this.chiptagsSubject.asObservable();
  baseURL = environment.localmanagedUrl+'api/Chiptags';

  constructor(private http: HttpClient) {
    this.cargarChiptags(); // Carga inicial al instanciar el servicio
  }

  private cargarChiptags(): void {
    this.http.get<Chiptag[]>(this.baseURL).pipe(
      map(data => data.map(item => new Chiptag(
        item.Id,
        item.tag
      )))
    ).subscribe(chiptags => this.chiptagsSubject.next(chiptags));
  }

  // Devuelve observable de todos los chiptags
  obtenerChiptags(): Observable<Chiptag[]> {
    return this.chiptags$;
  }

  // Devuelve un chiptag por id desde la instancia local
  obtenerChiptagPorId(id: string): Chiptag | undefined {
    return this.chiptagsSubject.value.find(tag => tag.Id === id);
  }
}
