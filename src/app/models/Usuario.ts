export class Usuario {
  constructor(
    private _nombre: string,
    private _apellido: string,
    private _correo: string,
    private _contrasena: string,
    private _telefono: number,
    private _pais: string,
    private _fechaNacimiento: Date
  ) {}

  // Método para definir cómo se serializa el objeto
  toJSON() {
    return {
      nombre: this._nombre,
      apellido: this._apellido,
      correo: this._correo,
      contrasena: this._contrasena,
      telefono: this._telefono.toString,
      pais: this._pais,
      fechaNacimiento: this._fechaNacimiento,
      esAdmin: false
    };
  }



  // Getter y Setter para nombre
  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  // Getter y Setter para apellido
  get apellido(): string {
    return this._apellido;
  }

  set apellido(value: string) {
    this._apellido = value;
  }

  // Getter y Setter para correo
  get correo(): string {
    return this._correo;
  }

  set correo(value: string) {
    this._correo = value;
  }

  // Getter y Setter para contraseña
  get contrasena(): string {
    return this._contrasena;
  }

  set contrasena(value: string) {
    this._contrasena = value;
  }

  // Getter y Setter para teléfono
  get telefono(): number {
    return this._telefono;
  }

  set telefono(value: number) {
    this._telefono = value;
  }

  // Getter y Setter para dirección
  get pais(): string {
    return this._pais;
  }

  set pais(value: string) {
    this._pais = value;
  }

  // Getter y Setter para fecha de nacimiento
  get fechaNacimiento(): Date {
    return this._fechaNacimiento;
  }

  set fechaNacimiento(value: Date) {
    this._fechaNacimiento = value;
  }

  static fromCorreoYContrasena(correo: string, contrasena: string): Usuario {
    return new Usuario('', '', correo, contrasena, 0, '', new Date());
  }
}
