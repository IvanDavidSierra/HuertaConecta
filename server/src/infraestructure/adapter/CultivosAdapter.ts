import { Cultivo } from '../../domain/cultivos';
import { CultivosPort } from '../../domain/cultivos_port';
import { CultivosEntity } from '../entities/cultivos';
import { AppDataSource } from '../config/data-base';
import { Repository } from 'typeorm';

export class CultivosAdapter implements CultivosPort {
  private cultivosRepository: Repository<CultivosEntity>;

  constructor() {
    this.cultivosRepository = AppDataSource.getRepository(CultivosEntity);
  }

  private toDomain(cultivo: CultivosEntity): Cultivo {
    return {
      id_cultivo: cultivo.id_cultivo,
      titulo_cultivo: cultivo.titulo_cultivo,
      descripcion_cultivo: cultivo.descripcion_cultivo,
    };
  }

  private toEntity(cultivo: Omit<Cultivo, 'id_cultivo'>): CultivosEntity {
    const entity = new CultivosEntity();
    entity.titulo_cultivo = cultivo.titulo_cultivo;
    entity.descripcion_cultivo = cultivo.descripcion_cultivo;
    return entity;
  }


  async createCultivo(cultivo: Omit<Cultivo, 'id_cultivo'>): Promise<Cultivo> {
    try {
      const newCultivo = this.toEntity(cultivo);
      const savedCultivo = await this.cultivosRepository.save(newCultivo);
      return this.toDomain(savedCultivo);
    } catch (error) {
      console.error("Error creating cultivo", error);
      throw new Error("Failed to create cultivo");
    }
  }

  async getCultivoById(id: number): Promise<Cultivo | null> {
    try {
      const cultivo = await this.cultivosRepository.findOne({ where: { id_cultivo: id } });
      return cultivo ? this.toDomain(cultivo) : null;
    } catch (error) {
      console.error("Error fetching cultivo by ID", error);
      throw new Error("Failed to fetch cultivo by ID");
    }
  }

  async getCultivoByTitle(titulo: string): Promise<Cultivo | null> {
    try{
      const cultivo = await this.cultivosRepository.findOne({ where: { titulo_cultivo: titulo } });
      return cultivo ? this.toDomain(cultivo) : null;
    }catch (error) {
      console.error("Error fetching cultivo by title", error);
      throw new Error("Failed to fetch cultivo by title");
    }
  }

  async getAllCultivos(): Promise<Cultivo[]> {
    try{
      const cultivos = await this.cultivosRepository.find({
        order: {
          id_cultivo: 'ASC'
        }
      });
      return cultivos.map(cultivo => this.toDomain(cultivo));
    }catch (error) {
      console.error("Error fetching all cultivos", error);
      throw new Error("Failed to fetch all cultivos");
    }
  }

  async updateCultivo(id: number, cultivo: Partial<Cultivo>): Promise<Cultivo | null> {
    try {
      const existingCultivo = await this.cultivosRepository.findOne({ where: { id_cultivo: id } });
      if (!existingCultivo) return null;
      Object.assign(existingCultivo, {
        titulo_cultivo: cultivo.titulo_cultivo ?? existingCultivo.titulo_cultivo,
        descripcion_cultivo: cultivo.descripcion_cultivo ?? existingCultivo.descripcion_cultivo,
      });
      const updatedCultivo = await this.cultivosRepository.save(existingCultivo);
      return this.toDomain(updatedCultivo);
    } catch (error) {
      console.error("Error updating cultivo", error);
      throw new Error("Failed to update cultivo");
    }
  }

  async deleteCultivo(id: number): Promise<boolean> {
    try {
      const result = await this.cultivosRepository.delete({ id_cultivo: id });
      return (result.affected ?? 0) > 0;
    } catch (error) {
      console.error("Error deleting cultivo", error);
      throw new Error("Failed to delete cultivo");
    }
  }
} 