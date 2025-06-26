import { Router } from 'express';
import { CultivosController } from '../controller/CultivosController';

const router = Router();

router.post("/cultivo", async (req, res) =>{
    try{
        await CultivosController.createCultivo(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error en la creación del estado" });
    }
});

router.get("/cultivo", async (req, res)=>{
    try{
        await CultivosController.getAllCultivos(req, res);
    }catch (e){
        res.status(500).json({ message: "Error al obtener los estados" });
    }
});

router.get("/cultivo/:id", async(req,res)=>{
    try{
        await CultivosController.getCultivoById(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al obtener el estado por ID" });
    }
});

router.get("/cultivo/title/:title", async(req,res)=>{
    try{
        await CultivosController.getCultivoByTitle(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al obtener el estado por nombre" });
    }
});

router.put("/cultivo/:id", async(req,res)=>{
    try{
        await CultivosController.updateEstadoTarea(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al actualizar el estado" });
    }
});

router.delete("/cultivo/:id", async(req, res)=>{
    try {
        await CultivosController.deleteEstadoTarea(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al eliminar el estado" });
    }
});

export default router; 