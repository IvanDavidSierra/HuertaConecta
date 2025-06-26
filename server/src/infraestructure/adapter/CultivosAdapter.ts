import { Cultivo } from '../../domain/cultivos';
import { CultivosPort } from '../../domain/cultivos_port';
import { CultivoEntity } from '../entities/cultivos';

export class CultivosAdapter implements CultivosPort {
  private cultivos: CultivoEntity[] = [];
  private idCounter = 1;

  async createCultivo(cultivo: Omit<Cultivo, 'id_cultivo'>): Promise<Cultivo> {
    const newCultivo: CultivoEntity = {
      id_cultivo: this.idCounter++,
      ...cultivo,
    };
    this.cultivos.push(newCultivo);
    return newCultivo;
  }

  async getCultivoById(id: number): Promise<Cultivo | null> {
    return this.cultivos.find(c => c.id_cultivo === id) || null;
  }

  async getCultivoByTitle(titulo: string): Promise<Cultivo | null> {
    return this.cultivos.find(c => c.titulo_cultivo === titulo) || null;
  }

  async getAllCultivos(): Promise<Cultivo[]> {
    return this.cultivos;
  }

  async updateCultivo(id: number, cultivo: Partial<Cultivo>): Promise<Cultivo | null> {
    const index = this.cultivos.findIndex(c => c.id_cultivo === id);
    if (index === -1) return null;
    this.cultivos[index] = { ...this.cultivos[index], ...cultivo };
    return this.cultivos[index];
  }

  async deleteCultivo(id: number): Promise<boolean> {
    const index = this.cultivos.findIndex(c => c.id_cultivo === id);
    if (index === -1) return false;
    this.cultivos.splice(index, 1);
    return true;
  }
} 