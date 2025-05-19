export class Producto {
  constructor(
    public id: number,
    public titulo: string,
    public precio: number,
    public cantidad: number,
    public descripcion: string,
    public imagenes: string[], // Cambiado a vector de strings
    public categoria: string,
    public plataforma: string,
    public stock: number,
    public fecha: string,
    public rating: string,
    public likes: string,
    public dislikes: string,
    public etiquetas: string[], // Cambiado a vector de strings

  ){}
  // ...código existente...


}
