import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(private http: HttpClient) { }
  baseURL = 'https://localhost:7053/api/Productos';



  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<any[]>(this.baseURL).pipe(
      map(data => data.map(item => new Producto(
        item.Id, // <-- mapea correctamente
        item.titulo,
        item.precio,
        item.cantidad,
        item.descripcion,
        item.imagenes,
        item.Categoria, // <-- mapea correctamente
        item.Plataformas, // <-- mapea correctamente
        item.stock,
        item.fecha,
        item.rating,
        item.likes,
        item.dislikes,
        item.Etiquetas // <-- mapea correctamente
      )))
    );
  }

  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseURL}/${id}`).pipe(
      map(data => new Producto(
        data.Id,
        data.titulo,
        data.precio,
        data.cantidad,
        data.descripcion,
        data.imagenes,
        data.Categoria,
        data.Plataformas,
        data.stock,
        data.fecha,
        data.rating,
        data.likes,
        data.dislikes,
        data.Etiquetas
      ))
    );
  }

    // ...existing code...

    actualizarRating(id: string, rating: number): Observable<any> {
      return this.http.post<any>(`${this.baseURL}/update-rating/${id}`, { rating });
    }

    actualizarLikesDislikes(id: string, likes: number, dislikes: number): Observable<any> {
      return this.http.post<any>(`${this.baseURL}/update-likes-dislikes/${id}`, { likes, dislikes });
    }

    obtenerTopRanking(cantidad: number): Observable<Producto[]> {
      return this.http.get<any[]>(`${this.baseURL}/top-ranking?cantidad=${cantidad}`).pipe(
        map(data => data.map(item => new Producto(
          item.id,
          item.titulo,
          item.precio,
          item.cantidad,
          item.descripcion,
          item.imagenes,
          item.categoria,
          item.plataformas,
          item.stock,
          item.fecha,
          item.rating,
          item.likes,
          item.dislikes,
          item.etiquetas
        )))
      );
    }

    obtenerTopLikes(cantidad: number): Observable<Producto[]> {
      return this.http.get<any[]>(`${this.baseURL}/top-likes?cantidad=${cantidad}`).pipe(
        map(data => data.map(item => new Producto(
          item.id,
          item.titulo,
          item.precio,
          item.cantidad,
          item.descripcion,
          item.imagenes,
          item.categoria,
          item.plataformas,
          item.stock,
          item.fecha,
          item.rating,
          item.likes,
          item.dislikes,
          item.etiquetas
        )))
      );
    }

    // ...existing code...
    filtrarProductos(
      filtros: {
        categoria?: string,
        plataforma?: string,
        min?: number,
        max?: number,
        sortBy?: string,
        sortOrder?: boolean
      }
    ) {
      return this.http.get<Producto[]>(`${this.baseURL}/filtrar`, { params: filtros });
    }
    // ...existing code...

  // ...existing code...


}
