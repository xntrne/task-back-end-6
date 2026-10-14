import express from "express";
import { initDatabase } from "./db/pool.js";
import { todosRouter } from "./routes/todos.routes.js";

const app = express();

app.use(express.json());

app.use("/todos", todosRouter);

app.use((req, res) => {
  res.status(404).json({ error: "route not found" });
});

app.use((err, req, res, next) => {
  console.log("err", err);

  if (err.type === "entity.parse.failed") {
    res.status(400).json({ error: "invalid JSON body" });
    return;
  }

  res.status(500).json({ error: "something went wrong" });
});

await initDatabase();

app.listen(3000, () => {
  console.log("listening on port 3000");
});
