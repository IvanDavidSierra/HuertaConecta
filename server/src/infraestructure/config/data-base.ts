import  { DataSource } from "typeorm";
import dotenv from "dotenv";
import { usuarios } from "../entities/usuarios";
import { tipos_usuarios } from "../entities/tipos_usuario";

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
    entities: [usuarios, tipos_usuarios],

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