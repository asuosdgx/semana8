import { Router } from "express";
import { Usuario } from "../models/Usuario.js";
import { Endereco } from "../models/Endereco.js";

export const userRouter = Router();

userRouter.get("/usuarios", async (req, res) => {
  const listagemUser = await Usuario.findAll();
  res.json(listagemUser);
});

userRouter.get("/usuarios/:id", async (req, res) => {
  const user = await Usuario.findOne({
    where: { id: req.params.id },
    include: [Endereco],
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Usuário inválido!" });
  }
});

userRouter.post("/usuarios", async (req, res) => {
  const { nome, telefone, email, cpf, dataNasc, endereco } = req.body;

  try {
    await Usuario.create(
      { nome, telefone, email, cpf, dataNasc, endereco },
      { include: [Endereco] }
    );
    res.json({ message: "Usuário inserido com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Um erro ocorreu ao inserir o usuário." });
  }
});
userRouter.put("/usuarios/:id", async (req, res) => {
  const idUser = req.params.id;
  const { nome, telefone, email, cpf, dataNasc, endereco } = req.body;
  try {
    const user = await Usuario.findOne({ where: { id: idUser } });
    if (user) {
      await Endereco.update(endereco, { where: { usuarioId: idUser } });
      await user.update({ nome, telefone, email, cpf, dataNasc });
      res.json({ message: "Usuário atualizado!" });
    } else {
      res.status(404).json({ message: "O usuário não foi encontrado." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Ocorreu um erro ao atualizar o usuário." });
  }
});

userRouter.delete("/usuarios/:id", async (req, res) => {
  const idUser = req.params.id;

  try {
    const user = await Usuario.findOne({ where: { id: idUser } });

    if (user) {
      await user.destroy();
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Ocorreu um erro ao excluir o usuário." });
    console.log(err);
  }
});
