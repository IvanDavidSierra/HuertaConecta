import { TipoUserPort } from '../../domain/TipoUserPort';
import { TipoUser as TipoUserDomain } from '../../domain/TipoUser';
import { TipoUser as TipoUserEntities } from '../entities/TipoUser';
import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-base';

export class TipoUserAdapter implements TipoUserPort{
    private tipoUserRepository: Repository<TipoUserEntities>;

    constructor() {
        this.tipoUserRepository = AppDataSource.getRepository(TipoUserEntities);
    }


    //Transforma la entidad de infraestructura(entidad User.ts) al modelo de dominio (interface User.ts)
    private toDomain(tipoUser: TipoUserEntities): TipoUserDomain {
        return {
            id: tipoUser.id,
            name: tipoUser.name,
        };
    }
    
            //Transforma el modelo de dominio a la entidad de infraestructura
    private toEntity(tipoUser: Omit<TipoUserDomain, "id">): TipoUserEntities {
        const tipoUserEntity = new TipoUserEntities();
        tipoUserEntity.name = tipoUser.name;
        return tipoUserEntity;
    }


    async createTipouser(tipoUser: Omit<TipoUserDomain, 'id'>): Promise<number> {
            try{
                const newTipoUser = this.toEntity(tipoUser);
                const saveTipoUser = await this.tipoUserRepository.save(newTipoUser);
                return saveTipoUser.id;
            }catch(e){
                console.error("Error creating tipo user", e);
                throw new Error("Failed to create tipo user");
            }
    }
  
    async updateTipouser(id: number, tipoUser: Partial<TipoUserDomain>): Promise<boolean> {
            try {
                const existingTipoUser = await this.tipoUserRepository.findOne({where:{id:id}})
                if(!existingTipoUser) return false;
                //Actualizar solo los campos que son enviados
                Object.assign(existingTipoUser, {
                name: tipoUser.name ?? existingTipoUser.name,
            });
            await this.tipoUserRepository.save(existingTipoUser);
            return true;
            } catch (e) {
                console.error("Error updating tipo user:", e)
                throw new Error("Failed to update tipo user");
            }
    }
    async deleteTipouser(id: number): Promise<boolean> {
            try {
                const existingTipoUser = await this.tipoUserRepository.findOne({where:{id:id}});
                if(!existingTipoUser) return false;
                await this.tipoUserRepository.remove(existingTipoUser);
                return true;
            } catch (e) {
                console.error("Error deleting tipo user", e);
                throw new Error("Failed to delete tipo user");
            }  
    }
    async getTipouserById(id: number): Promise<TipoUserDomain | null> {
            try {
                const existingTipoUser = await this.tipoUserRepository.findOne({where:{id:id}});
                return existingTipoUser ? this.toDomain(existingTipoUser): null;
            } catch (e) {
                console.error("Error fatching tipo user by id", e);
                throw new Error("Failed to fetch tipo user by ID");
            }
    }
    async getAllTipousers(): Promise<TipoUserDomain[]> {
            try {
                const tipoUsers = await this.tipoUserRepository.find();
                return tipoUsers.map(tipoUser => this.toDomain(tipoUser));
            } catch (e) {
                console.error("Error fatching tipo user ", e);
                throw new Error("Failed to fetch tipo user");
            }
    }
  }
