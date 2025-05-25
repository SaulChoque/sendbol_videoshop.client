export class Producto {
  constructor(
    public Id: string,
    public titulo: string,
    public precio: number,
    public cantidad: number,
    public descripcion: string,
    public imagenes: string[], // Cambiado a vector de strings
    public Categoria: string,
    public Plataformas: string[],
    public stock: number,
    public fecha: Date,
    public rating: number,
    public likes: number,
    public dislikes: number,
    public Etiquetas: string[], // Cambiado a vector de strings
  ){}
  // ...código existente...


}
