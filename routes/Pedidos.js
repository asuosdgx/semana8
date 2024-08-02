import { Pedido } from "../models/Pedido.js";
import { Usuario } from "../models/Usuario.js";
import { Router } from "express";

export const pedidosRouter = Router();

pedidosRouter.get("/pedidos", async (req, res) => {
  const listaPedidos = await Pedido.findAll();
  res.json(listaPedidos);
});

pedidosRouter.get("/pedidos/:id", async (req, res) => {
  const pedido = await Pedido.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [{ model: Usuario, attributes: ["id", ["nome", "nomeUsuario"]] }],
  });

  if (pedido) {
    res.json(pedido);
  } else {
    res.status(404).json({ message: "Pedido não encontrado." });
  }
});

pedidosRouter.delete("/pedidos/:id", async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (pedido) {
      await pedido.destroy();
      res.json({ message: "Pedido removido com sucesso" });
    } else {
      res.status(404).json({ message: "Pedido não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Ocorreu um erro ao excluir o pedido" });
  }
});

pedidosRouter.post("/pedidos", async (req, res) => {
  const { nome, quantidade, observacao, usuarioId } = req.body;

  try {
    const user = await Usuario.findByPk(usuarioId);

    if (user) {
      await Pedido.create({ nome, quantidade, observacao, usuarioId });
      res.json({ message: "Pedido criado com sucesso." });
    } else {
      res
        .status(404)
        .json({ message: "Falha ao criar pedido. Cliente não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Ocorreu um erro ao adicionar o pedido." });
  }
});

pedidosRouter.put("/pedidos/:id", async (req, res) => {
  const { nome, quantidade, observacao } = req.body;

  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (pedido) {
      await pedido.update({ nome, quantidade, observacao });
      res.json({ message: "Pedido atualizado com sucesso." });
    } else {
      res.status(404).json({ message: "Pedido não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Um erro ocorreu ao atualizar o pedido." });
  }
});
