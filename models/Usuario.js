import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Evento } from "./Evento.js";

export const Usuario = connection.define("usuario",{
    nome: {
        type:DataTypes.STRING(60),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: true
    },
    dataNasc:{
        type: DataTypes.STRING(10),
        allowNull: false
    }
});
Usuario.hasMany(Evento)
Evento.belongsTo(Usuario)