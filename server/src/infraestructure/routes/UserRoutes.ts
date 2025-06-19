import { UserApplicationService } from "../../application/UserApplicationService";
import { Router } from "express";
import { UserAdapter } from "../adapter/UserAdapter";
import { UserController } from "../controller/UserController";


const router = Router();

//Inicializacion de lass capas 

const userAdapter = new UserAdapter();
const userAppService = new UserApplicationService(userAdapter);
const userController = new UserController(userAppService);

//definir lass rutas con manejo de errores

router.post("/users", async (req, res) => {
    try {
        await userController.createUser(req, res);  
    } catch (error) {
        res.status(500).json({ message: "Error en la creación del usuario" });
    }
});

router.get("/users",async(_req,res)=>{
    try {
        await userController.getAllUsers(res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        await userController.getUserById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
});

router.get("/users/email/:email", async (req, res) => {
    try {
        await userController.getUserByEmail(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario por email" });
    }
});


// por si las moscas xd
router.delete("/users/:id", async (req, res) => {
    try {
        await userController.deleteUser(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario" });
    }
});
router.put("/users", async (req, res) => {
    try {
        await userController.updateUser(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario" });
    }
});

export default router;