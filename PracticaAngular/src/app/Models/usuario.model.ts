export class Empleado {
  constructor(name: string, ap_paterno: string, ap_materno: string, telefono: string, codigo: string, activo: boolean, rol_id: number, email: string, password: string) {
    this.name = name;
    this.ap_paterno = ap_paterno;
    this.ap_materno = ap_materno;
    this.telefono = telefono;
    this.codigo = codigo;
    this.activo = activo;
    this.rol_id = rol_id;
    this.email = email;
    this.password = password;
  }
  name: string = "";
  ap_paterno: string = "";
  ap_materno: string = "";
  telefono: string = "";
  codigo: string = "";
  activo: boolean = false;
  rol_id: number = 0;
  email: string = "";
  password: string = "";
}
