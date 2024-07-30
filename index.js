import {connection, authenticate} from "./config/database.js";
import { Usuario } from "./models/Usuario.js";
import { Evento } from "./models/Evento.js";
import { Locais } from "./models/Locais.js";


authenticate(connection).then(()=>{
    connection.sync({force:true}) // connection.sync({force:true}); > dropa tudo do banco, útil em desenvolvimento.
});