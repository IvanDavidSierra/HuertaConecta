import { Repository } from 'typeorm';
import { Tarea } from '../../domain/tareas';
import { TareasPort } from '../../domain/tareas_port';
import { TareasEntity } from '../entities/tareas';
import { AppDataSource } from '../config/data-base';
import { usuarios_huertas } from '../entities/usuarios_huertas';
import { UsuariosHuertas } from '../../domain/usuarios_huertas';
import { User } from '../../domain/usuarios';
import { Huerta } from '../../domain/huertas';

export class TareasAdapter implements TareasPort {
  private tareasRepository: Repository<TareasEntity>;

  constructor() {
    this.tareasRepository = AppDataSource.getRepository(TareasEntity);
  }

  private toUsuariosHuertasDomain(entity: usuarios_huertas | null): UsuariosHuertas | null {
    if (!entity) return null;
    return {
      id_usuarios_huertas: entity.id_usuarios_huertas,
      id_usuario: {
        id_usuario: entity.id_usuario,
        nombre: "",
        apellido: "",
        correo: "",
        contrasena: "",
        id_tipo_usuario: { id_tipo_usuario: 0, descripcion_tipo_usuario: "" },
        fecha_creacion: new Date()
      } as User,
      id_huerta: {
        id_huerta: entity.id_huerta,
        nombre_huerta: "",
        direccion_huerta: "",
        descripcion: "",
        fecha_creacion: new Date()
      } as Huerta,
      fecha_vinculacion: entity.fecha_vinculacion
    };
  }

  private toDomain(tarea: TareasEntity): Tarea {
    return {
      id_tarea: tarea.id_tarea,
      titulo_tarea: tarea.titulo_tarea,
      descripcion_tarea: tarea.descripcion_tarea,
      fecha_inicio_tarea: tarea.fecha_inicio_tarea,
      fecha_fin_tarea: tarea.fecha_fin_tarea,
      estado_tarea: tarea.estado_tarea,
      cultivo: tarea.cultivo,
      fecha_creacion: tarea.fecha_creacion,
      usuario_huerta: this.toUsuariosHuertasDomain(tarea.usuario_huerta),
    };
  }

  private toEntity(tarea: Omit<Tarea, 'id_tarea'>): TareasEntity {
    const tareaEntity = new TareasEntity();
    tareaEntity.titulo_tarea = tarea.titulo_tarea;
    tareaEntity.descripcion_tarea = tarea.descripcion_tarea;
    tareaEntity.fecha_inicio_tarea = tarea.fecha_inicio_tarea;
    tareaEntity.fecha_fin_tarea = tarea.fecha_fin_tarea;
    tareaEntity.id_estado_tarea = typeof tarea.estado_tarea === 'object' ? tarea.estado_tarea.id_estado_tarea : tarea.estado_tarea;
    tareaEntity.id_cultivo = typeof tarea.cultivo === 'object' ? tarea.cultivo.id_cultivo : tarea.cultivo;
    tareaEntity.fecha_creacion = tarea.fecha_creacion;
    if (tarea.usuario_huerta !== null && tarea.usuario_huerta !== undefined) {
      tareaEntity.id_usuarios_huertas = typeof tarea.usuario_huerta === 'object'
        ? tarea.usuario_huerta.id_usuarios_huertas
        : tarea.usuario_huerta;
    }
    return tareaEntity;
  }

  async createTarea(tarea: Omit<Tarea, 'id_tarea'>): Promise<Tarea> {
    try {
      const tareaEntity = this.toEntity(tarea);
      const savedTarea = await this.tareasRepository.save(tareaEntity);
      // Cargar relaciones
      const tareaWithRelations = await this.tareasRepository.findOne({ where: { id_tarea: savedTarea.id_tarea }, relations: ['estado_tarea', 'cultivo', 'usuario_huerta'] });
      return this.toDomain(tareaWithRelations!);
    } catch (error) {
      console.error("Error creating tarea", error);
      throw new Error("Failed to create tarea");
    }
  }

  async getTareaById(id: number): Promise<Tarea | null> {
    try {
      const tarea = await this.tareasRepository.findOne({ where: { id_tarea: id }, relations: ['estado_tarea', 'cultivo', 'usuario_huerta'] });
      return tarea ? this.toDomain(tarea) : null;
    } catch (error) {
      console.error("Error fetching tarea by ID", error);
      throw new Error("Failed to fetch tarea");
    }
  }

  async getTareaByTitulo(titulo: string): Promise<Tarea | null> {
    try {
      const tarea = await this.tareasRepository.findOne({ where: { titulo_tarea: titulo }, relations: ['estado_tarea', 'cultivo', 'usuario_huerta'] });
      return tarea ? this.toDomain(tarea) : null;
    } catch (error) {
      console.error("Error fetching tarea by title", error);
      throw new Error("Failed to fetch tarea");
    }
  }

  async getTareasByUsuarioHuertaId(id_usuarios_huertas: number): Promise<Tarea[]> {
    try {
      const tareas = await this.tareasRepository.find({ where: { id_usuarios_huertas }, relations: ['estado_tarea', 'cultivo', 'usuario_huerta'] });
      return tareas.map(t => this.toDomain(t));
    } catch (error) {
      console.error("Error fetching tareas by usuario huerta ID", error);
      throw new Error("Failed to fetch tareas");
    }
  }

  async getAllTareas(): Promise<Tarea[]> {
    try {
      const tareas = await this.tareasRepository.find({ relations: ['estado_tarea', 'cultivo', 'usuario_huerta'] });
      return tareas.map(t => this.toDomain(t));
    } catch (error) {
      console.error("Error fetching all tareas", error);
      throw new Error("Failed to fetch tareas");
    }
  }

  async updateTarea(id: number, tarea: Partial<Tarea>): Promise<Tarea | null> {
    try {
      // Solo actualiza los campos primitivos y los IDs de las relaciones
      const updateData: any = {};
      if (tarea.titulo_tarea !== undefined) updateData.titulo_tarea = tarea.titulo_tarea;
      if (tarea.descripcion_tarea !== undefined) updateData.descripcion_tarea = tarea.descripcion_tarea;
      if (tarea.fecha_inicio_tarea !== undefined) updateData.fecha_inicio_tarea = tarea.fecha_inicio_tarea;
      if (tarea.fecha_fin_tarea !== undefined) updateData.fecha_fin_tarea = tarea.fecha_fin_tarea;
      if (tarea.estado_tarea !== undefined) updateData.id_estado_tarea = tarea.estado_tarea.id_estado_tarea;
      if (tarea.cultivo !== undefined) updateData.id_cultivo = tarea.cultivo.id_cultivo;
      if (tarea.fecha_creacion !== undefined) updateData.fecha_creacion = tarea.fecha_creacion;
      if (tarea.usuario_huerta !== undefined && tarea.usuario_huerta !== null) {
        updateData.id_usuarios_huertas = typeof tarea.usuario_huerta === 'object'
          ? tarea.usuario_huerta.id_usuarios_huertas
          : tarea.usuario_huerta;
      }
      await this.tareasRepository.update(id, updateData);
      const updatedTarea = await this.tareasRepository.findOne({ where: { id_tarea: id }, relations: ['estado_tarea', 'cultivo', 'usuario_huerta'] });
      return updatedTarea ? this.toDomain(updatedTarea) : null;
    } catch (error) {
      console.error("Error updating tarea", error);
      throw new Error("Failed to update tarea");
    }
  }

  async deleteTarea(id: number): Promise<boolean> {
    try {
      const result = await this.tareasRepository.delete(id);
      return (result.affected ?? 0) > 0;
    } catch (error) {
      console.error("Error deleting tarea", error);
      throw new Error("Failed to delete tarea");
    }
  }
} 