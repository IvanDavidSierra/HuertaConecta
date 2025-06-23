import express from "express";
import userRoutes from "../routes/UserRoutes";
import tipoUserRoutes from "../routes/TipoUserRoutes";
import authRoutes from "../routes/AuthRoutes";


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
        this.app.use("/api/auth", authRoutes);
    }

    private middleware():void{
        this.app.use(express.json());
    }

    getApp(){
        return this.app;
    }
}


export default new App().getApp();
