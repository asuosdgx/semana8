import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Pedido = connection.define("pedido",{
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.STRING(3),
        allowNull: false
    },
    observacao: {
        type: DataTypes.STRING(200),
        defaultValue: "S/N"
    }

});
