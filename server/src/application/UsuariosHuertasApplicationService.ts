import { UsuariosHuertas } from '../domain/usuarios_huertas';
import { UsuariosHuertasPort } from '../domain/usuarios_huertas_port';

export class UsuariosHuertasApplicationService {
    private port: UsuariosHuertasPort;

    // Constructor
    constructor(port: UsuariosHuertasPort) {
        this.port = port;
    }

    // Métodos de casos de uso
    async createUsuariosHuertas(usuariosHuertas: Omit<UsuariosHuertas, 'id_usuarios_huertas'>): Promise<number> {
        // Verificar si ya existe una vinculación para este usuario y huerta
        const existingUserHuertas = await this.port.getUsuariosHuertasByUserId(usuariosHuertas.id_usuario.id_usuario);
        const existingVinculacion = existingUserHuertas.find(uh => uh.id_huerta.id_huerta === usuariosHuertas.id_huerta.id_huerta);
        
        if(existingVinculacion) {
            throw new Error("El usuario ya está vinculado a esta huerta");
        }
        
        return await this.port.createUsuariosHuertas(usuariosHuertas);
    }

    async updateUsuariosHuertas(id: number, usuariosHuertas: Partial<UsuariosHuertas>): Promise<boolean> {
        const existingUserHuerta = await this.port.getUsuariosHuertasById(id);
        if(!existingUserHuerta) {
            throw new Error("Vinculación usuario-huerta no encontrada");
        }
        return await this.port.updateUsuariosHuertas(id, usuariosHuertas);  
    }

    async deleteUsuariosHuertas(id: number): Promise<boolean> {
        const existingUserHuerta = await this.port.getUsuariosHuertasById(id);
        if(!existingUserHuerta){
            throw new Error("Vinculación usuario-huerta no encontrada");
        }
        return await this.port.deleteUsuariosHuertas(id);
    }

    async getAllUsuariosHuertas(): Promise<UsuariosHuertas[]> {
        return await this.port.getAllUsuariosHuertas();
    }

    async getUsuariosHuertasById(id: number): Promise<UsuariosHuertas | null> {
        return await this.port.getUsuariosHuertasById(id);
    }

    async getUsuariosHuertasByUserId(userId: number): Promise<UsuariosHuertas[]> {
        return await this.port.getUsuariosHuertasByUserId(userId);
    }

    async getUsuariosHuertasByHuertaId(huertaId: number): Promise<UsuariosHuertas[]> {
        return await this.port.getUsuariosHuertasByHuertaId(huertaId);
    }
}