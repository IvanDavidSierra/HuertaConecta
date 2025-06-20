import { UserPort} from '../../domain/UserPort';
import { User as UserDomain } from '../../domain/User';
import { User as UserEntities } from '../entities/User';
import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-base';    

export class UserAdapter implements UserPort {
    private userRepository: Repository<UserEntities>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntities);
    }

        //Transforma la entidad de infraestructura(entidad User.ts) al modelo de dominio (interface User.ts)
    private toDomain(user: UserEntities): UserDomain {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            lastName: user.lastName,
            idTipoUsuario: user.idTipoUsuario,
            creationDate: user.creationDate,
            actualizationDate: user.actualizationDate
        };
    }

        //Transforma el modelo de dominio a la entidad de infraestructura
    private toEntity(user: Omit<UserDomain, "id">): UserEntities {
        const userEntity = new UserEntities();
        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.password = user.password;
        userEntity.lastName = user.lastName;
        userEntity.idTipoUsuario = user.idTipoUsuario;
        userEntity.creationDate = user.creationDate;
        userEntity.actualizationDate = user.actualizationDate;
        return userEntity;
    }

    async createUser(user: Omit<UserDomain, "id">): Promise<number> {
        try{
            const newUser = this.toEntity(user);
            const saveUser = await this.userRepository.save(newUser);
            return saveUser.id;
        }catch(e){
            console.error("Error creating user", e);
            throw new Error("Failed to create user");
        }
    }
    async updateUser(id: number, user: Partial<UserDomain>): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({where:{id:id}})
            if(!existingUser) return false;
            //Actualizar solo los campos que son enviados
            Object.assign(existingUser, {
            name: user.name ?? existingUser.name,
            email: user.email ?? existingUser.email,
            password: user.password ?? existingUser.password,
            lastName: user.lastName ?? existingUser.lastName,
            idTipoUsuario: user.idTipoUsuario ?? existingUser.idTipoUsuario,
            creationDate: user.creationDate ?? existingUser.creationDate,
            actualizationDate: user.actualizationDate ?? existingUser.actualizationDate
      });
      await this.userRepository.save(existingUser);
      return true;
        } catch (e) {
            console.error("Error updating user:", e)
            throw new Error("Failed to update user");
        }
    }
    async deleteUser(id: number): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({where:{id:id}});
            if(!existingUser) return false;
            await this.userRepository.save(existingUser);
            return true;
        } catch (e) {
            console.error("Error deleting user", e);
            throw new Error("Failed to delete user");
        }  
    }
    async getUserById(id: number): Promise<UserDomain | null> {
        try {
            const existingUser = await this.userRepository.findOne({where:{id:id}});
            return existingUser ? this.toDomain(existingUser): null;
        } catch (e) {
            console.error("Error fatching user by id", e);
            throw new Error("Failed to fetch user by ID");
        }
    }
    async getAllUsers(): Promise<UserDomain[]> {
        try {
            const users = await this.userRepository.find({where:{id: 1}});
            return users.map(user => this.toDomain(user));
        } catch (e) {
            console.error("Error fatching user ", e);
            throw new Error("Failed to fetch user");
        }
    }
    async getUserByEmail(email: string): Promise<UserDomain | null> {
        try {
            const existingUser = await this.userRepository.findOne({where:{email: email}});
            return existingUser ? this.toDomain(existingUser): null;
        } catch (e) {
            console.error("Error fatching user by email", e);
            throw new Error("Failed to fetch user by email");
        }
    }
}