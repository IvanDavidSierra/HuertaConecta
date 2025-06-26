import { EstadosTareasAdapter } from '../infraestructure/adapter/EstadosTareasAdapter';
import { EstadoTarea } from '../domain/estados_tareas';

const estadosTareasAdapter = new EstadosTareasAdapter();

export class EstadosTareasApplicationService {
  static createEstadoTarea(data: Omit<EstadoTarea, 'id_estado_tarea'>) {
    return estadosTareasAdapter.createEstadoTarea(data);
  }
  static getEstadoTareaById(id: number) {
    return estadosTareasAdapter.getEstadoTareaById(id);
  }
  static getEstadoTareaByDescripcion(descripcion: string) {
    return estadosTareasAdapter.getEstadoTareaByDescripcion(descripcion);
  }
  static getAllEstadosTareas() {
    return estadosTareasAdapter.getAllEstadosTareas();
  }
  static updateEstadoTarea(id: number, data: Partial<EstadoTarea>) {
    return estadosTareasAdapter.updateEstadoTarea(id, data);
  }
  static deleteEstadoTarea(id: number) {
    return estadosTareasAdapter.deleteEstadoTarea(id);
  }
} 