import { HuertaApplicationService } from "../../application/HuertaApplicationService";
import { HuertaAdapter } from "../adapter/HuertasAdapter";
import { HuertaController } from "../controller/HuertaController";
import { Router } from "express";

const router = Router();

// Inicialización de las capas

const huertaAdapter = new HuertaAdapter();
const huertaAppService = new HuertaApplicationService(huertaAdapter);
const huertaController = new HuertaController(huertaAppService);

// Definir las rutas con manejo de errores

router.post("/huertas", async (req, res) =>{
    try{
        await huertaController.createHuerta(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error en la creación de la huerta" });
    }
});

router.get("/huertas", async (req, res)=>{
    try{
        await huertaController.getAllHuertas(req, res);
    }catch (e){
        res.status(500).json({ message: "Error al obtener las huertas" });
    }
});

router.get("/huertas/:id", async(req,res)=>{
    try{
        await huertaController.getHuertaById(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al obtener la huerta por ID" });
    }
});

router.get("/huertas/nombre/:nombre", async(req,res)=>{
    try{
        await huertaController.getHuertaByName(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al obtener la huerta por nombre" });
    }
});

router.put("/huertas/:id", async(req,res)=>{
    try{
        await huertaController.updateHuerta(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al actualizar la huerta" });
    }
});

router.delete("/huerta/:id", async(req, res)=>{
    try {
        await huertaController.deleteHuerta(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al eliminar la huerta" });
    }
});

export default router;