import { Cultivo } from './cultivos';

export interface CultivosPort {
  createCultivo(cultivo: Omit<Cultivo, 'id_cultivo'>): Promise<Cultivo>;
  getCultivoById(id: number): Promise<Cultivo | null>;
  getCultivoByTitle(titulo: string): Promise<Cultivo | null>;
  getAllCultivos(): Promise<Cultivo[]>;
  updateCultivo(id: number, cultivo: Partial<Cultivo>): Promise<Cultivo | null>;
  deleteCultivo(id: number): Promise<boolean>;
} 