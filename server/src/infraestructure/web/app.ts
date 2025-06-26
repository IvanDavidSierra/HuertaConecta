import express from "express";
import userRoutes from "../routes/UserRoutes";
import tipoUserRoutes from "../routes/TipoUserRoutes";
import huertasRouter  from "../routes/HuertasRoutes";
import usuariosHuertasRoutes from "../routes/UsuariosHuertasRoutes";
import publicacionesRoutes  from "../routes/PublicacionesRoutes";
import estadosTareasRouter from "../routes/EstadosTareasRoutes";


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
        this.app.use("/api", publicacionesRoutes);
        this.app.use("/api", estadosTareasRouter);
    }

    private middleware():void{
        this.app.use(express.json());
    }

    getApp(){
        return this.app;
    }
}


export default new App().getApp();
