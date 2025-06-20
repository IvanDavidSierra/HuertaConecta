import { TipoUser } from '../domain/tipos_usuarios';
import { TipoUserPort } from '../domain/tipos_usuarios_port';

export class TipoUserApplicationService {
    private port: TipoUserPort;

    // Constructor
    constructor(port: TipoUserPort) {
        this.port = port;
    }

    // Use case methods
    async createTipoUser(tipoUser: Omit<TipoUser, 'id'>): Promise<number> {
        return await this.port.createTipouser(tipoUser);
    }

    async updateTipoUser(id: number, tipoUser: Partial<TipoUser>): Promise<boolean> {
        const existingTipoUser = await this.port.getTipouserById(id);
        if (!existingTipoUser) {
            throw new Error("Tipo de usuario no encontrado");
        }
        return await this.port.updateTipouser(id, tipoUser);
    }

    async deleteTipoUser(id: number): Promise<boolean> {
        const existingTipoUser = await this.port.getTipouserById(id);
        if (!existingTipoUser) {
            throw new Error("Tipo de usuario no encontrado");
        }
        return await this.port.deleteTipouser(id);
    }

    async getAllTipoUsers(): Promise<TipoUser[]> {
        return await this.port.getAllTipousers();
    }

    async getTipoUserById(id: number): Promise<TipoUser | null> {
        return await this.port.getTipouserById(id);
    }
}   