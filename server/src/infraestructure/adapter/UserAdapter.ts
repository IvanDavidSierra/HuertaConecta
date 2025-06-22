import { UserPort} from '../../domain/usuarios_port';
import { User as UserDomain } from '../../domain/usuarios';
import { usuarios as UserEntities } from '../entities/usuarios';
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
            id_usuario: user.id_usuario,
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo,
            contrasena: user.contrasena,
            id_tipo_usuario: user.tipo_usuario,
            fecha_creacion: user.fecha_creacion
        };
    }

        //Transforma el modelo de dominio a la entidad de infraestructura
    private toEntity(user: Omit<UserDomain, "id_usuario">): UserEntities {
        const userEntity = new UserEntities();
        userEntity.nombre = user.nombre;
        userEntity.apellido = user.apellido;
        userEntity.correo = user.correo;
        userEntity.contrasena = user.contrasena;
        userEntity.tipo_usuario = user.id_tipo_usuario as any;
        userEntity.fecha_creacion = user.fecha_creacion;
        return userEntity;
    }

    async createUser(user: Omit<UserDomain, "id">): Promise<number> {
        try{
            const newUser = this.toEntity(user);
            const saveUser = await this.userRepository.save(newUser);
            return saveUser.id_usuario;
        }catch(e){
            console.error("Error creating user", e);
            throw new Error("Failed to create user");
        }
    }
    async updateUser(id: number, user: Partial<UserDomain>): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({where:{id_usuario:id}})
            if(!existingUser) return false;
            //Actualizar solo los campos que son enviados
            Object.assign(existingUser, {
            nombre: user.nombre ?? existingUser.nombre,
            apellido: user.apellido ?? existingUser.apellido,
            correo: user.correo ?? existingUser.correo,
            contrasena: user.contrasena ?? existingUser.contrasena,
            id_tipo_usuario: user.id_tipo_usuario ?? existingUser.tipo_usuario,
            fecha_creacion: user.fecha_creacion ?? existingUser.fecha_creacion,
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
            const existingUser = await this.userRepository.findOne({where:{id_usuario:id}});
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
            const existingUser = await this.userRepository.findOne({where:{id_usuario:id}});
            return existingUser ? this.toDomain(existingUser): null;
        } catch (e) {
            console.error("Error fatching user by id", e);
            throw new Error("Failed to fetch user by ID");
        }
    }
    async getAllUsers(): Promise<UserDomain[]> {
        try {
            const users = await this.userRepository.find();
            return users.map(user => this.toDomain(user));  
        } catch (e) {
            console.error("Error fatching user ", e);
            throw new Error("Failed to fetch user");
        }
    }
    async getUserByEmail(email: string): Promise<UserDomain | null> {
        try {
            const existingUser = await this.userRepository.findOne({where:{correo: email}});
            return existingUser ? this.toDomain(existingUser): null;
        } catch (e) {
            console.error("Error fatching user by email", e);
            throw new Error("Failed to fetch user by email");
        }
    }
}