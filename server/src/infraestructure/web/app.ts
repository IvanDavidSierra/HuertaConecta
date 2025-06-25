import express from "express";
import userRoutes from "../routes/UserRoutes";
import tipoUserRoutes from "../routes/TipoUserRoutes";

import huertasRouter  from "../routes/HuertasRoutes";
import usuariosHuertasRoutes from "../routes/UsuariosHuertasRoutes";



class App {
    private app: express.Application;
    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }

    private routes():void{
        console.log("routes");
        this.app.use("/api", userRoutes);
        this.app.use("/api", tipoUserRoutes);
        this.app.use("/api", huertasRouter);
        this.app.use("/api", usuariosHuertasRoutes);
    }

    private middleware():void{
        this.app.use(express.json());
    }

    getApp(){
        return this.app;
    }
}


export default new App().getApp();
