export interface Tarea {
  id_tarea: number;
  titulo_tarea: string;
  descripcion_tarea: string;
  fecha_inicio_tarea: Date;
  fecha_fin_tarea: Date;
  id_estado_tarea: number;
  id_cultivo: number;
  fecha_creacion: Date;
  id_usuarios_huertas: number;
} 