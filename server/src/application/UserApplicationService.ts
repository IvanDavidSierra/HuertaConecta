import {User} from '../domain/User';
import { UserPort } from '../domain/UserPort';

export class UserApplicationService{
    private port: UserPort;

    //2.Constructor
    constructor(port:UserPort){
        this.port = port;
    }

    //3- metodos casos usos logica

    async createUser(user: Omit<User,"id">):Promise<number>{
        const existingUser = await this.port.getUserByEmail(user.email);
        if(existingUser){
            throw new Error("Email existente");
        }
        return await this.port.createUser(user);
    }
    async updateUser(id:number, user: Partial<User>): Promise<boolean>{
        const existingUser = await this.port.getUserById(id);
        if(!existingUser){
            throw new Error("User not found");
        }
        if(user.email){
            const emailTaken = await this.port.getUserByEmail(user.email);
            if(emailTaken && emailTaken.id !== id){
                throw new Error('email is already taken by another user');
            }
        }
        return await this.port.updateUser(id,user);
    }
    async deleteUser(id:number): Promise<boolean>{
        const existingUser = await this.port.getUserById(id);
        if(!existingUser){
            throw new Error("User not found");
        }
        return await this.port.deleteUser(id);
    }
    async getAllUsers(): Promise<User[]>{
        return await this.port.getAllUsers();
    }
    async getUserById(id:number): Promise<User | null>{
        return await this.port.getUserById(id);
    }
    async getUserByEmail(email: string): Promise<User | null>{
        return await this.port.getUserByEmail(email);
    }
}