const { Router } = require("express");

const AuthMiddleware = require("./app/middlewares/AuthMiddleware");

const UserController = require("./app/controllers/UserController");
const LoginController = require("./app/controllers/LoginController");
const ListaController = require("./app/controllers/ListaController");
const TarefaController = require("./app/controllers/TarefaController");

const routes = new Router();

// ---- users -------------------------------------------------------------------------
routes.post("/api/v1/login", LoginController.login);
routes.post("/api/v1/register", UserController.register);
routes.get("/api/v1/user/:_userId", AuthMiddleware, UserController.getProfile);
//
// ---- listas ------------------------------------------------------------------------
routes.get("/api/v1/listas", AuthMiddleware, ListaController.index);
routes.get("/api/v1/listas/:_id", AuthMiddleware, ListaController.show);
routes.post("/api/v1/listas", AuthMiddleware, ListaController.store);
routes.put("/api/v1/listas/:_id", AuthMiddleware, ListaController.update);
routes.delete("/api/v1/listas/:_id", AuthMiddleware, ListaController.delete);
//
// ---- tarefas ------------------------------------------------------------------------
routes.get("/api/v1/tarefas/:_listaId", AuthMiddleware, TarefaController.index);
routes.get("/api/v1/tarefa/:_id", AuthMiddleware, TarefaController.show);
routes.post("/api/v1/tarefas", AuthMiddleware, TarefaController.store);
routes.put("/api/v1/tarefas/:_id", AuthMiddleware, TarefaController.update);
routes.delete("/api/v1/tarefas/:_id", AuthMiddleware, TarefaController.delete);
//

module.exports = routes;
