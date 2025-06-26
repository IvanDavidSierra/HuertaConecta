import { Router } from 'express';
import { EstadosTareasController } from '../controller/EstadosTareasController';

const router = Router();

router.post("/estado", async (req, res) =>{
    try{
        await EstadosTareasController.createEstadoTarea(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error en la creación del estado" });
    }
});

router.get("/estado", async (req, res)=>{
    try{
        await EstadosTareasController.getAllEstadosTareas(req, res);
    }catch (e){
        res.status(500).json({ message: "Error al obtener los estados" });
    }
});

router.get("/estado/:id", async(req,res)=>{
    try{
        await EstadosTareasController.getEstadoTareaById(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al obtener el estado por ID" });
    }
});

router.get("/estado/descripcion/:descripcion", async(req,res)=>{
    try{
        await EstadosTareasController.getEstadoTareaByDescripcion(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al obtener el estado por nombre" });
    }
});

router.put("/estado/:id", async(req,res)=>{
    try{
        await EstadosTareasController.updateEstadoTarea(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al actualizar el estado" });
    }
});

router.delete("/estado/:id", async(req, res)=>{
    try {
        await EstadosTareasController.deleteEstadoTarea(req, res);
    }catch (error) {
        res.status(500).json({ message: "Error al eliminar el estado" });
    }
});

export default router; 