import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Locais } from "./Locais.js";

export const Evento = connection.define("evento",{
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_termino: {
        type: DataTypes.DATE,
        allowNull: false
    },
    local:{
        type: DataTypes.STRING(60),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    }
    
});
Evento.hasOne(Locais)
Locais.belongsTo(Evento)