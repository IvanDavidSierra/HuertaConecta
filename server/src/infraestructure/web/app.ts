import express from "express";
import userRoutes from "../routes/UserRoutes";
import tipoUserRoutes from "../routes/TipoUserRoutes";
import authRoutes from "../routes/AuthRoutes";

import huertasRouter  from "../routes/HuertasRoutes";
import usuariosHuertasRoutes from "../routes/UsuariosHuertasRoutes";
import publicacionesRoutes  from "../routes/PublicacionesRoutes";
import estadosTareasRouter from "../routes/EstadosTareasRoutes";
import cultivosRouter from "../routes/CultivosRoutes";
import tareasRouter from "../routes/TareasRoutes";
import dashboardRoutes from "../routes/DashboardRoutes";

class App {
    private app: express.Application;
    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }

    private routes():void{
        console.log("routes");
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api", userRoutes);
        this.app.use("/api", tipoUserRoutes);
        this.app.use("/api", huertasRouter);
        this.app.use("/api", usuariosHuertasRoutes);
        this.app.use("/api", publicacionesRoutes);
        this.app.use("/api", estadosTareasRouter);
        this.app.use("/api", cultivosRouter);
        this.app.use("/api", tareasRouter);
        this.app.use("/api/dashboard", dashboardRoutes);
    }

    private middleware():void{
        this.app.use(express.json());
    }

    getApp(){
        return this.app;
    }
}


export default new App().getApp();
