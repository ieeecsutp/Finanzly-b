export interface RegistroItemRs {
  id_registro: number;
  tipo: string;
  descripcion: string;
  monto: number;
  fecha_registro: string;
  usuario: {
    id_usuario: number;
    nombre: string;
  };
  categoria: {
    id_categoria: number;
    nombre: string;
    tipo: string;
  };
}