import { Cultivo } from './cultivos';
import { EstadoTarea } from './estados_tareas';
import { UsuariosHuertas } from './usuarios_huertas';

export interface Tarea {
  id_tarea: number;
  titulo_tarea: string;
  descripcion_tarea: string;
  fecha_inicio_tarea: Date;
  fecha_fin_tarea: Date;
  estado_tarea: EstadoTarea;
  cultivo: Cultivo;
  fecha_creacion: Date;
  usuario_huerta: UsuariosHuertas | null;
} 