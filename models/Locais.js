import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Locais = connection.define("locais",{
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
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
    referencia: {
        type: DataTypes.STRING(80),
        defaultValue: "S/N"
    }
});


