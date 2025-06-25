import { Publicacion } from "./publicaciones";

export interface PublicacionesPort {
    createPublicacion(publicacion: Omit<Publicacion, 'id_publicacion'>): Promise<number>;
    updatePublicacion(id: number, publicacion: Partial<Publicacion>): Promise<boolean>;
    deletePublicacion(id: number): Promise<boolean>;
    getPublicacionById(id: number): Promise<Publicacion | null>;
    getAllPublicaciones(): Promise<Publicacion[]>;
    getPublicacionByTitle(title: string): Promise<Publicacion | null>;
} 