import { Router } from 'express';
import { TareasController } from '../controller/TareasController';

const router = Router();

router.post("/tarea", async (req, res) =>{
    try{
        await TareasController.createTarea(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error en la creación de la tarea" });
    }
});

router.get("/tarea", async (req, res)=>{
    try{
        await TareasController.getAllTareas(req, res);
    }catch (e){
        res.status(500).json({ message: "Error al obtener las tareas" });
    }
});

router.get("/tarea/:id", async(req,res)=>{
    try{
        await TareasController.getTareaById(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al obtener la tarea por ID" });
    }
});

router.get("/tarea/titulo/:titulo", async(req,res)=>{
    try{
        await TareasController.getTareaByTitulo(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al obtener la tarea por título" });
    }
});

router.put("/tarea/:id", async(req,res)=>{
    try{
        await TareasController.updateTarea(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al actualizar la tarea" });
    }
});

router.delete("/tarea/:id", async(req, res)=>{
    try {
        await TareasController.deleteTarea(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al eliminar la tarea" });
    }
});

export default router; 