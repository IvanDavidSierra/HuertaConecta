 
import app from './infraestructure/web/app';
import { ServerBootstrap } from './infraestructure/bootstrap/server.bootstrap';
import { connectDB } from './infraestructure/config/data-base';

const server = new ServerBootstrap(app);
/**
 * Función flecha y uso del async/await para iniciar el servidor
 */

const start = async () => {
    try {
        //Connectar a DB
        await connectDB();
        //Inicializa el servidor
        const instances = [server.init()];
        await Promise.all(instances);
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

start();
