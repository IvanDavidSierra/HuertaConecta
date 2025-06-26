import { EstadoTarea } from '../../domain/estados_tareas';
import { EstadosTareasPort } from '../../domain/estados_tareas_port';
import { EstadoTareaEntity } from '../entities/estados_tareas';
import { AppDataSource } from '../config/data-base';
import { Repository } from 'typeorm';

export class EstadosTareasAdapter implements EstadosTareasPort {
  private estadosRepository: Repository<EstadoTareaEntity>;


  constructor(){
    this.estadosRepository = AppDataSource.getRepository(EstadoTareaEntity);
  }

  private toDomain(estado: EstadoTareaEntity): EstadoTarea {
    return {
      id_estado_tarea: estado.id_estado_tarea,
      descripcion_estado_tarea: estado.descripcion_estado_tarea,
    };
  }

  private toEntity(estado: Omit<EstadoTarea, 'id_estado_tarea'>): EstadoTareaEntity {
    const entity = new EstadoTareaEntity();
    entity.descripcion_estado_tarea = estado.descripcion_estado_tarea;
    return entity;
  }

  async createEstadoTarea(estado: Omit<EstadoTarea, 'id_estado_tarea'>): Promise<EstadoTarea> {
    try{
    const newEstado = this.toEntity(estado);
    const savedEstado = await this.estadosRepository.save(newEstado);
    return this.toDomain(savedEstado);
  }catch (error) {
    console.error("Error creating estado tarea", error);
    throw new Error("Failed to create estado tarea");
  }
}


  async getEstadoTareaById(id: number): Promise<EstadoTarea | null> {
    try{
      const estado = await this.estadosRepository.findOne({ where: { id_estado_tarea: id } });
      return estado ? this.toDomain(estado) : null;
    }catch (error) {
      console.error("Error fetching estado tarea by ID", error);
      throw new Error("Failed to fetch estado tarea by ID");
    }
  }

  async getEstadoTareaByDescripcion(descripcion: string): Promise<EstadoTarea | null> {
    try{
      const estado = await this.estadosRepository.findOne({ where: { descripcion_estado_tarea: descripcion } });
      return estado ? this.toDomain(estado) : null;
    }catch (error) {
      console.error("Error fetching estado tarea by descripcion", error);
      throw new Error("Failed to fetch estado tarea by descripcion");
    }
  }

  async getAllEstadosTareas(): Promise<EstadoTarea[]> {
    try{
      const estados = await this.estadosRepository.find();
      return estados.map(estado=>this.toDomain(estado));
    }catch (error) {
      console.error("Error fetching all estados tareas", error);
      throw new Error("Failed to fetch all estados tareas");
    }
  }

  async updateEstadoTarea(id: number, estado: Partial<EstadoTarea>): Promise<EstadoTarea | null> {
    try {
      const existingEstado = await this.estadosRepository.findOne({ where: { id_estado_tarea: id } });
      if (!existingEstado) return null;

      Object.assign(existingEstado, {
        descripcion_estado_tarea: estado.descripcion_estado_tarea ?? existingEstado.descripcion_estado_tarea,
      });

      const updatedEstado = await this.estadosRepository.save(existingEstado);
      return this.toDomain(updatedEstado);
    } catch (error) {
      console.error("Error updating estado tarea", error);
      throw new Error("Failed to update estado tarea");
    }
  }

  async deleteEstadoTarea(id: number): Promise<boolean> {
    try {
      const result = await this.estadosRepository.delete({ id_estado_tarea: id });
      return (result.affected ?? 0) > 0;
    } catch (error) {
      console.error("Error deleting estado tarea", error);
      throw new Error("Failed to delete estado tarea");
    }
  }
} 