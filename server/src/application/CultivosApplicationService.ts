import { CultivosAdapter } from '../infraestructure/adapter/CultivosAdapter';
import { Cultivo } from '../domain/cultivos';

const cultivosAdapter = new CultivosAdapter();

export class CultivosApplicationService {
  static createCultivo(data: Omit<Cultivo, 'id_cultivo'>) {
    return cultivosAdapter.createCultivo(data);
  }
  static getCultivoById(id: number) {
    return cultivosAdapter.getCultivoById(id);
  }
  static getCultivoByTitle(titulo: string) {
    return cultivosAdapter.getCultivoByTitle(titulo);
  }
  static getAllCultivos() {
    return cultivosAdapter.getAllCultivos();
  }
  static updateCultivo(id: number, data: Partial<Cultivo>) {
    return cultivosAdapter.updateCultivo(id, data);
  }
  static deleteCultivo(id: number) {
    return cultivosAdapter.deleteCultivo(id);
  }
} 