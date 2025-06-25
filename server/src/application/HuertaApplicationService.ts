import { Huerta } from '../domain/huertas.js';
import { HuertasPort } from '../domain/huertas_port.js';

export class HuertaApplicationService {
    private port: HuertasPort;

    constructor(port: HuertasPort) {
        this.port = port;
    }

    // logica

    async createHuerta(huerta: Omit<Huerta, 'id_huerta'>):Promise<number>{
        const existingHuerta = await this.port.getHuertaByNombre(huerta.nombre_huerta);
        if(existingHuerta) {
            throw new Error("Huerta already exists");
        }
        return await this.port.createHuerta(huerta);
    }

    async updateHuerta(id: number, huerta: Partial<Huerta>): Promise<boolean>{
        const existingHuerta = await this.port.getHuertaById(id);
        if(!existingHuerta) {
            throw new Error("Huerta not found");
        }
        if(huerta.nombre_huerta){
            const huertaTaken = await this.port.getHuertaByNombre(huerta.nombre_huerta);
            if(huertaTaken && huertaTaken.id_huerta !== id) {
                throw new Error('El nombre de la huerta ya está en uso por otra huerta');
            }
        }
        return await this.port.updateHuerta(id, huerta);
    }

    async deleteHuerta(id: number): Promise<boolean> {
        const existingHuerta = await this.port.getHuertaById(id);
        if(!existingHuerta) {
            throw new Error("Huerta not found");
        }
        return await this.port.deleteHuerta(id);
    }
    async getAllHuertas(): Promise<Huerta[]> {
        return await this.port.getAllHuertas();
    }
    async getHuertaById(id: number): Promise<Huerta | null> {
        return await this.port.getHuertaById(id);
    }
    async getHuertaByNombre(nombre_huerta: string): Promise<Huerta | null> {
        return await this.port.getHuertaByNombre(nombre_huerta);
    }
}