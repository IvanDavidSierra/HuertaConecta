import { Publicacion } from '../domain/publicaciones';
import { PublicacionesPort } from '../domain/publicaciones_port';

export class PublicacionesApplicationService {
    private port: PublicacionesPort;

    constructor(port: PublicacionesPort) {
        this.port = port;
    }

    async createPublicacion(publicacion: Omit<Publicacion, 'id_publicacion'>): Promise<number> {
        const existingPublicacion = await this.port.getPublicacionByTitle(publicacion.titulo_post);
        if (existingPublicacion) {
            throw new Error('Publicación con el mismo título ya existe');
        }
        return await this.port.createPublicacion(publicacion);
    }

    async updatePublicacion(id: number, publicacion: Partial<Publicacion>): Promise<boolean> {
        return await this.port.updatePublicacion(id, publicacion);
    }

    async deletePublicacion(id: number): Promise<boolean> {
        return await this.port.deletePublicacion(id);
    }

    async getAllPublicaciones(): Promise<Publicacion[]> {
        return await this.port.getAllPublicaciones();
    }

    async getPublicacionById(id: number): Promise<Publicacion | null> {
        return await this.port.getPublicacionById(id);
    }

    async getPublicacionByTitle(publicacion: string): Promise<Publicacion | null> {
        return await this.port.getPublicacionByTitle(publicacion);
    }

    async getPublicacionesByHuertaId(id_huerta: number): Promise<Publicacion[]> {
        // Llama al método del adaptador
        // @ts-ignore
        return await this.port.getPublicacionesByHuertaId(id_huerta);
    }
} 