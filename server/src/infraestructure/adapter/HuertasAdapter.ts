import { HuertasPort } from "../../domain/huertas_port";
import { Huerta as HuertaDomain } from "../../domain/huertas";
import { huertas as HuertaEntities } from "../entities/huertas";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-base";

export class HuertaAdapter implements HuertasPort {
    private huertaRepository: Repository<HuertaEntities>;
    constructor() {
        this.huertaRepository = AppDataSource.getRepository(HuertaEntities);
    }

    private toDomain(huerta: HuertaEntities): HuertaDomain{
        return {
            id_huerta: huerta.id_huerta,
            nombre_huerta: huerta.nombre_huerta,
            direccion_huerta: huerta.descripcion,
            descripcion: huerta.direccion_huerta,
            fecha_creacion: huerta.fecha_creacion
        };
    }

    private toEntity(huerta: Omit<HuertaDomain, "id_huerta">): HuertaEntities {
        const huertaEntity = new HuertaEntities();
        huertaEntity.nombre_huerta = huerta.nombre_huerta;
        huertaEntity.descripcion = huerta.descripcion;
        huertaEntity.direccion_huerta = huerta.direccion_huerta;
        huertaEntity.fecha_creacion = huerta.fecha_creacion;
        return huertaEntity;
    }

    async createHuerta(huerta: Omit<HuertaDomain, "id_huerta">): Promise<number> {
        try {
            const newHuerta = this.toEntity(huerta);
            const savedHuerta = await this.huertaRepository.save(newHuerta);
            return savedHuerta.id_huerta;
        } catch (e) {
            console.error("Error creating huerta", e);
            throw new Error("Failed to create huerta");
        }
    }

    async updateHuerta(id: number, huerta: Partial<HuertaDomain>): Promise<boolean> {
        try {
            const existingHuerta = await this.huertaRepository.findOne({ where: { id_huerta: id } });
            if (!existingHuerta) return false;
            Object.assign(existingHuerta, {
                nombre_huerta: huerta.nombre_huerta ?? existingHuerta.nombre_huerta,
                descripcion: huerta.descripcion ?? existingHuerta.descripcion,
                direccion_huerta: huerta.direccion_huerta ?? existingHuerta.direccion_huerta,
                fecha_creacion: huerta.fecha_creacion ?? existingHuerta.fecha_creacion
            });
            await this.huertaRepository.save(existingHuerta);
            return true;
        } catch (e) {
            console.error("Error updating huerta", e);
            throw new Error("Failed to update huerta");
        }
    }

    async deleteHuerta(id: number): Promise<boolean> {
        try {
            const existingHuerta = await this.huertaRepository.findOne({ where:{id_huerta: id} });
            if(!existingHuerta) return false;
            await this.huertaRepository.save(existingHuerta);
            return true;
        } catch (e) {
            console.error("Error deleting huerta", e);
            throw new Error("Failed to delete huerta");
        }
    }

    async getHuertaById(id: number): Promise<HuertaDomain | null> {
        try {
            const existingHuerta = await this.huertaRepository.findOne({ where: { id_huerta: id } });
            return existingHuerta ? this.toDomain(existingHuerta) : null;
        } catch (e) {
            console.error("Error fetching huerta by id", e);
            throw new Error("Failed to fetch huerta by ID");
        }
    }

    async getAllHuertas(): Promise<HuertaDomain[]> {
        try {
            const huertas = await this.huertaRepository.find();
            return huertas.map(huerta => this.toDomain(huerta));
        } catch (e) {
            console.error("Error fetching all huertas", e);
            throw new Error("Failed to fetch all huertas");
        }
    }

    async getHuertaByNombre(nombre_huerta: string): Promise<HuertaDomain | null> {
        try {
            const existingHuerta = await this.huertaRepository.findOne({ where: { nombre_huerta } });
            return existingHuerta ? this.toDomain(existingHuerta) : null;
        } catch (e) {
            console.error("Error fetching huerta by nombre", e);
            throw new Error("Failed to fetch huerta by nombre");
        }
    }
}