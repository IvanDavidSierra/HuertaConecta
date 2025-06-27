import { Tarea } from './tareas';

export interface TareasPort {
  createTarea(tarea: Omit<Tarea, 'id_tarea'>): Promise<Tarea>;
  getTareaById(id: number): Promise<Tarea | null>;
  getTareaByTitulo(titulo: string): Promise<Tarea | null>;
  getTareasByUsuarioHuertaId(id_usuarios_huertas: number): Promise<Tarea[]>;
  getTareasByHuertaId(id_huerta: number): Promise<Tarea[]>;
  getAllTareas(): Promise<Tarea[]>;
  updateTarea(id: number, tarea: Partial<Tarea>): Promise<Tarea | null>;
  deleteTarea(id: number): Promise<boolean>;
} 