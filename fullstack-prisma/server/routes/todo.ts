import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/index";
import { PrismaClient } from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

router.post('/todos', authenticateJwt, async (req, res) => {
  const { title, description } = req.body;
  const done = false;
  const userId = Array.isArray(req.headers["userId"]) ? req.headers["userId"][0] : req.headers["userId"];

  if (!userId) {
    res.json({ error: "provide userId for the todos !" });
    return;
  }

  const newTodo = await prisma.todo.create({ data: { title, description, done, userId: parseInt(userId) } });
  console.log("todo : ", newTodo);
  if (newTodo) {
    res.status(201).json(newTodo);
  } else {
    res.status(500).json({ error: 'Failed to create a new todo' });
  }
});


router.get('/todos', authenticateJwt, async (req, res) => {
  const userId = Array.isArray(req.headers["userId"]) ? req.headers["userId"][0] : req.headers["userId"];

  if (!userId) {
    res.json({ error: "provide userId for the todos !" });
    return;
  }

  await prisma.todo.findMany({
    where: {
      userId: parseInt(userId)
    }
  })
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

router.put('/todos/:todoId/done', authenticateJwt, async (req, res) => {
  const { todoId } = await req.params;
  console.log("todoId : ", todoId);
  const userId = Array.isArray(req.headers["userId"]) ? req.headers["userId"][0] : req.headers["userId"];

  if (!userId) {
    res.json({ error: "provide userId for the todos !" });
    return;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id: parseInt(todoId), userId: parseInt(userId) }, data: {
      description: req.body.description,
      title: req.body.title,
      done: true
    }
  });
  if (!updatedTodo) {
    return res.status(500).json({ error: 'Failed to update todo' });
  } else {
    return res.json({ message: "todo updated !", updatedTodo });
  };
});

export default router;
