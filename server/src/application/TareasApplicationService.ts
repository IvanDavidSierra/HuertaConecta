import { TareasAdapter } from '../infraestructure/adapter/TareasAdapter';
import { Tarea } from '../domain/tareas';

const tareasAdapter = new TareasAdapter();

export class TareasApplicationService {
  static createTarea(data: Omit<Tarea, 'id_tarea'>) {
    return tareasAdapter.createTarea(data);
  }
  static getTareaById(id: number) {
    return tareasAdapter.getTareaById(id);
  }
  static getTareaByTitulo(titulo: string) {
    return tareasAdapter.getTareaByTitulo(titulo);
  }
  static getTareasByUsuarioHuertaId(id_usuarios_huertas: number) {
    return tareasAdapter.getTareasByUsuarioHuertaId(id_usuarios_huertas);
  }
  static getTareasByHuertaId(id_huerta: number) {
    return tareasAdapter.getTareasByHuertaId(id_huerta);
  }
  static getAllTareas() {
    return tareasAdapter.getAllTareas();
  }
  static updateTarea(id: number, data: Partial<Tarea>) {
    return tareasAdapter.updateTarea(id, data);
  }
  static deleteTarea(id: number) {
    return tareasAdapter.deleteTarea(id);
  }
} 