import  { DataSource } from "typeorm";
import dotenv from "dotenv";
import { usuarios } from "../entities/usuarios";
import { tipos_usuarios } from "../entities/tipos_usuario";
import { huertas } from "../entities/huertas";
import { usuarios_huertas } from "../entities/usuarios_huertas";
import { publicaciones } from "../entities/publicaciones";
import { EstadoTareaEntity } from "../entities/estados_tareas";

dotenv.config();
export const AppDataSource = new DataSource({
    type : "postgres",
    host : process.env.DB_HOST,
    port : Number(process.env.DB_PORT),
    username : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    schema : process.env.DB_SCHEMA,
    logging : true,
    entities: [usuarios, tipos_usuarios, huertas, usuarios_huertas, publicaciones,EstadoTareaEntity],

});


//Conectar a la base de datos
export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("shi :3");
    } catch (error) {
        console.error("ño :(");
        process.exit(1);
    }
}