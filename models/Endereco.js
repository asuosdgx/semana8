import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Endereco = connection.define("endereco",{
   
    rua: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    uf: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING(8),
        allowNull: false
    }
});


