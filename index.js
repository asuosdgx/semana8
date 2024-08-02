import {connection, authenticate} from "./config/database.js";
import express from "express";
import { userRouter } from "./routes/Usuarios.js";
import { pedidosRouter } from "./routes/Pedidos.js";


authenticate(connection).then(()=>{
    connection.sync() // connection.sync({force:true}); > dropa tudo do banco, útil em desenvolvimento.
});

const app = express();
app.use(express.json()); //Garante que as requisiçoes que tem body sejam lidas como json
app.use(userRouter)
app.use(pedidosRouter)


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
  });