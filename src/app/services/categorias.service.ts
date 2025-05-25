import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/Categoria';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private categoriasSubject = new BehaviorSubject<Categoria[]>([]);
  categorias$ = this.categoriasSubject.asObservable();
  baseURL = 'https://localhost:7053/api/Categorias';

  constructor(private http: HttpClient) {
    this.cargarCategorias(); // Carga inicial al instanciar el servicio
  }

  private cargarCategorias(): void {
    this.http.get<Categoria[]>(this.baseURL).pipe(
      map(data => data.map(item => new Categoria(
        item.Id,
        item.titulo,
        item.Etiquetas
      )))
    ).subscribe(categorias => this.categoriasSubject.next(categorias));
  }

  // Devuelve observable de todas las categorías
  obtenerCategorias(): Observable<Categoria[]> {
    return this.categorias$;
  }

  // Devuelve una categoría por id desde la instancia local
  obtenerCategoriaPorId(id: number): Categoria | undefined {
    return this.categoriasSubject.value.find(cat => cat.Id === id);
  }
}
