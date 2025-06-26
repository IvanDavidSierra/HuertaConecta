import { EstadoTarea } from './estados_tareas';

export interface EstadosTareasPort {
  createEstadoTarea(estado: Omit<EstadoTarea, 'id_estado_tarea'>): Promise<EstadoTarea>;
  getEstadoTareaById(id: number): Promise<EstadoTarea | null>;
  getEstadoTareaByDescripcion(descripcion: string): Promise<EstadoTarea | null>;
  getAllEstadosTareas(): Promise<EstadoTarea[]>;
  updateEstadoTarea(id: number, estado: Partial<EstadoTarea>): Promise<EstadoTarea | null>;
  deleteEstadoTarea(id: number): Promise<boolean>;
} 