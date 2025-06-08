import express from "express";


class App {
    private app: express.Application;
    constructor() {
        this.app = express();
        this.routes();
        this.middleware();
    }

    private routes():void{
        console.log("routes");
    }

    private middleware():void{
        this.app.use(express.json());
    }

    getApp(){
        return this.app;
    }
}


export default new App().getApp();
