import { Router } from "express";
import { todoRepository } from "../repositories/todo.repository.js";
import { validateBody } from "../middleware/validateBody.js";
import { validateParams } from "../middleware/validateParams.js";
import {
  todoIdParamsSchema,
  createTodoSchema,
  updateTodoSchema,
} from "../schema/todo.schema.js";

export const todosRouter = Router();

// POST todos
todosRouter.post("/", validateBody(createTodoSchema), async (req, res) => {
  const todo = await todoRepository.create(req.body);
  res.status(201).json({ message: "todo created successfully", data: todo });
});

// GET todos
todosRouter.get("/", async (req, res) => {
  res.json({ data: await todoRepository.getAll() });
});

// PATCH todos by id
todosRouter.patch(
  "/:id",
  validateParams(todoIdParamsSchema),
  validateBody(updateTodoSchema),
  async (req, res) => {
    const todo = await todoRepository.update(req.params.id, req.body);

    if (!todo) {
      res.status(404).json({ error: "todo not found" });
      return;
    }

    res.json({ message: "todo updated successfully", data: todo });
  }
);

// PATCH /todos toggle by id
todosRouter.patch("/:id/toggle", validateParams(todoIdParamsSchema), async (req, res) => {
  const todo = await todoRepository.toggleDone(req.params.id);

  if (!todo) {
    res.status(404).json({ error: "todo not found" });
    return;
  }

  res.json({ message: "todo toggled successfully", data: todo });
});

// DELETE /todos by id
todosRouter.delete("/:id", validateParams(todoIdParamsSchema), async (req, res) => {
  const wasDeleted = await todoRepository.delete(req.params.id);

  if (!wasDeleted) {
    res.status(404).json({ error: "todo not found" });
    return;
  }

  res.status(204).end();
});
