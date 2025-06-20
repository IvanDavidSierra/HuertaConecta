import { TipoUser } from './TipoUser';

export interface TipoUserPort {
    createTipouser(tipoUser: Omit<TipoUser, 'id'>): Promise<number>;
    updateTipouser(id: number, tipoUser: Partial<TipoUser>): Promise<boolean>;
    deleteTipouser(id: number): Promise<boolean>;
    getTipouserById(id: number): Promise<TipoUser | null>;
    getAllTipousers(): Promise<TipoUser[]>;
}
export { TipoUser };