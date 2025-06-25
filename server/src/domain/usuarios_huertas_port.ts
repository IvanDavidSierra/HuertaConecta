import { UsuariosHuertas } from "./usuarios_huertas";

export interface UsuariosHuertasPort{
    createUsuariosHuertas(usuariosHuertas: Omit<UsuariosHuertas, 'id_usuarios_huertas'>): Promise<number>;
    updateUsuariosHuertas(id: number, usuariosHuertas: Partial<UsuariosHuertas>): Promise<boolean>;
    deleteUsuariosHuertas(id: number): Promise<boolean>;
    getUsuariosHuertasById(id: number): Promise<UsuariosHuertas | null>;
    getAllUsuariosHuertas(): Promise<UsuariosHuertas[]>;
    getUsuariosHuertasByUserId(userId: number): Promise<UsuariosHuertas[]>;
    getUsuariosHuertasByHuertaId(huertaId: number): Promise<UsuariosHuertas[]>;
}