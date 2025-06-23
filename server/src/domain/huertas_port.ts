import{ Huerta } from './huertas.js';

export interface HuertasPort {
    createHuerta(huerta: Omit<Huerta, 'id_huerta'>): Promise<number>;
    updateHuerta(id: number, huerta: Partial<Huerta>): Promise<boolean>;
    deleteHuerta(id: number): Promise<boolean>;
    getHuertaById(id: number): Promise<Huerta | null>;
    getAllHuertas(): Promise<Huerta[]>;
    getHuertaByNombre(nombre: string): Promise<Huerta | null>;
}
export { Huerta };