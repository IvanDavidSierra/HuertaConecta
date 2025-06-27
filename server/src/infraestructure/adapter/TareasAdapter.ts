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
      id_usuario: entity.usuario ? {
        id_usuario: entity.usuario.id_usuario,
        nombre: entity.usuario.nombre,
        apellido: entity.usuario.apellido,
        correo: entity.usuario.correo,
        contrasena: entity.usuario.contrasena,
        id_tipo_usuario: entity.usuario.tipo_usuario,
        fecha_creacion: entity.usuario.fecha_creacion
      } as User : null,
      id_huerta: entity.huerta ? {
        id_huerta: entity.huerta.id_huerta,
        nombre_huerta: entity.huerta.nombre_huerta,
        direccion_huerta: entity.huerta.direccion_huerta,
        descripcion: entity.huerta.descripcion,
        fecha_creacion: entity.huerta.fecha_creacion
      } as Huerta : null,
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

  private toEntity(tarea: any): TareasEntity {
    const tareaEntity = new TareasEntity();
    tareaEntity.titulo_tarea = tarea.titulo || tarea.titulo_tarea;
    tareaEntity.descripcion_tarea = tarea.descripcion || tarea.descripcion_tarea;
    tareaEntity.fecha_inicio_tarea = tarea.fecha_inicio || tarea.fecha_inicio_tarea;
    tareaEntity.fecha_fin_tarea = tarea.fecha_fin || tarea.fecha_fin_tarea;

    // Acepta ambos nombres de campo para los IDs
    tareaEntity.id_estado_tarea = tarea.id_estado_tarea ?? (typeof tarea.estado_tarea === 'object' ? tarea.estado_tarea.id_estado_tarea : tarea.estado_tarea);
    tareaEntity.id_cultivo = tarea.id_cultivo ?? (typeof tarea.cultivo === 'object' ? tarea.cultivo.id_cultivo : tarea.cultivo);
    tareaEntity.id_usuarios_huertas = tarea.id_usuarios_huertas ?? (typeof tarea.usuario_huerta === 'object' ? tarea.usuario_huerta.id_usuarios_huertas : tarea.usuario_huerta);

    tareaEntity.fecha_creacion = tarea.fecha_creacion || new Date();

    return tareaEntity;
  }

  async createTarea(tarea: Omit<Tarea, 'id_tarea'>): Promise<Tarea> {
    try {
      console.log('Datos recibidos en adaptador:', tarea);
      const tareaEntity = this.toEntity(tarea);
      console.log('Entidad creada:', tareaEntity);
      const savedTarea = await this.tareasRepository.save(tareaEntity);
      console.log('Tarea guardada:', savedTarea);
      // Cargar relaciones
      const tareaWithRelations = await this.tareasRepository.findOne({ where: { id_tarea: savedTarea.id_tarea }, relations: ['estado_tarea', 'cultivo', 'usuario_huerta', 'usuario_huerta.usuario'] });
      return this.toDomain(tareaWithRelations!);
    } catch (error) {
      console.error("Error creating tarea", error);
      throw new Error(`Failed to create tarea: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  async getTareaById(id: number): Promise<Tarea | null> {
    try {
      const tarea = await this.tareasRepository.findOne({ where: { id_tarea: id }, relations: ['estado_tarea', 'cultivo', 'usuario_huerta', 'usuario_huerta.usuario'] });
      return tarea ? this.toDomain(tarea) : null;
    } catch (error) {
      console.error("Error fetching tarea by ID", error);
      throw new Error("Failed to fetch tarea");
    }
  }

  async getTareaByTitulo(titulo: string): Promise<Tarea | null> {
    try {
      const tarea = await this.tareasRepository.findOne({ where: { titulo_tarea: titulo }, relations: ['estado_tarea', 'cultivo', 'usuario_huerta', 'usuario_huerta.usuario'] });
      return tarea ? this.toDomain(tarea) : null;
    } catch (error) {
      console.error("Error fetching tarea by title", error);
      throw new Error("Failed to fetch tarea");
    }
  }

  async getTareasByUsuarioHuertaId(id_usuarios_huertas: number): Promise<Tarea[]> {
    try {
      const tareas = await this.tareasRepository.find({ where: { id_usuarios_huertas }, relations: ['estado_tarea', 'cultivo', 'usuario_huerta', 'usuario_huerta.usuario'] });
      return tareas.map(t => this.toDomain(t));
    } catch (error) {
      console.error("Error fetching tareas by usuario huerta ID", error);
      throw new Error("Failed to fetch tareas");
    }
  }

  async getAllTareas(): Promise<Tarea[]> {
    try {
      const tareas = await this.tareasRepository.find({ relations: ['estado_tarea', 'cultivo', 'usuario_huerta', 'usuario_huerta.usuario'] });
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
      if (tarea.titulo_tarea !== undefined || tarea.titulo !== undefined) updateData.titulo_tarea = tarea.titulo_tarea ?? tarea.titulo;
      if (tarea.descripcion_tarea !== undefined || tarea.descripcion !== undefined) updateData.descripcion_tarea = tarea.descripcion_tarea ?? tarea.descripcion;
      if (tarea.fecha_inicio_tarea !== undefined || tarea.fecha_inicio !== undefined) updateData.fecha_inicio_tarea = tarea.fecha_inicio_tarea ?? tarea.fecha_inicio;
      if (tarea.fecha_fin_tarea !== undefined || tarea.fecha_fin !== undefined) updateData.fecha_fin_tarea = tarea.fecha_fin_tarea ?? tarea.fecha_fin;

      // Estado tarea
      if (tarea.id_estado_tarea !== undefined) {
        updateData.id_estado_tarea = tarea.id_estado_tarea;
      } else if (tarea.estado_tarea !== undefined) {
        updateData.id_estado_tarea = typeof tarea.estado_tarea === 'object'
          ? tarea.estado_tarea.id_estado_tarea
          : tarea.estado_tarea;
      }
      // Cultivo
      if (tarea.id_cultivo !== undefined) {
        updateData.id_cultivo = tarea.id_cultivo;
      } else if (tarea.cultivo !== undefined) {
        updateData.id_cultivo = typeof tarea.cultivo === 'object'
          ? tarea.cultivo.id_cultivo
          : tarea.cultivo;
      }
      // Usuario huerta
      if (tarea.id_usuarios_huertas !== undefined) {
        updateData.id_usuarios_huertas = tarea.id_usuarios_huertas;
      } else if (tarea.usuario_huerta !== undefined && tarea.usuario_huerta !== null) {
        updateData.id_usuarios_huertas = typeof tarea.usuario_huerta === 'object'
          ? tarea.usuario_huerta.id_usuarios_huertas
          : tarea.usuario_huerta;
      }
      if (tarea.fecha_creacion !== undefined) updateData.fecha_creacion = tarea.fecha_creacion;

      // Evitar update vacío
      if (Object.keys(updateData).length === 0) {
        throw new Error('No se proporcionaron datos para actualizar la tarea');
      }

      await this.tareasRepository.update(id, updateData);
      const updatedTarea = await this.tareasRepository.findOne({ where: { id_tarea: id }, relations: ['estado_tarea', 'cultivo', 'usuario_huerta', 'usuario_huerta.usuario'] });
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