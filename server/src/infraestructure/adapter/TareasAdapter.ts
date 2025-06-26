import { Tarea } from '../../domain/tareas';
import { TareasPort } from '../../domain/tareas_port';
import { TareaEntity } from '../entities/tareas';

export class TareasAdapter implements TareasPort {
  private tareas: TareaEntity[] = [];
  private idCounter = 1;

  async createTarea(tarea: Omit<Tarea, 'id_tarea'>): Promise<Tarea> {
    const newTarea: TareaEntity = {
      id_tarea: this.idCounter++,
      ...tarea,
    };
    this.tareas.push(newTarea);
    return newTarea;
  }

  async getTareaById(id: number): Promise<Tarea | null> {
    return this.tareas.find(t => t.id_tarea === id) || null;
  }

  async getTareaByTitulo(titulo: string): Promise<Tarea | null> {
    return this.tareas.find(t => t.titulo_tarea === titulo) || null;
  }

  async getTareasByUsuarioHuertaId(id_usuarios_huertas: number): Promise<Tarea[]> {
    return this.tareas.filter(t => t.id_usuarios_huertas === id_usuarios_huertas);
  }

  async getAllTareas(): Promise<Tarea[]> {
    return this.tareas;
  }

  async updateTarea(id: number, tarea: Partial<Tarea>): Promise<Tarea | null> {
    const index = this.tareas.findIndex(t => t.id_tarea === id);
    if (index === -1) return null;
    this.tareas[index] = { ...this.tareas[index], ...tarea };
    return this.tareas[index];
  }

  async deleteTarea(id: number): Promise<boolean> {
    const index = this.tareas.findIndex(t => t.id_tarea === id);
    if (index === -1) return false;
    this.tareas.splice(index, 1);
    return true;
  }
} 