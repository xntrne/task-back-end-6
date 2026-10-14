import { pool } from "../db/pool.js";

// toTodo
function toTodo(row) {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    createdAt: row.created_at,
    done: row.done,
  };
}

export const todoRepository = {
  // create
  async create({ title, body }) {
    const { rows } = await pool.query(
      "INSERT INTO todos (title, body) VALUES ($1, $2) RETURNING *",
      [title, body]
    );
    return toTodo(rows[0]);
  },

  // getAll
  async getAll() {
    const { rows } = await pool.query("SELECT * FROM todos ORDER BY id");
    return rows.map(toTodo);
  },

  // update
  async update(id, { title, body }) {
    const { rows } = await pool.query(
      "UPDATE todos SET title = COALESCE($1, title), body = COALESCE($2, body) WHERE id = $3 RETURNING *",
      [title ?? null, body ?? null, id]
    );
    return rows[0] ? toTodo(rows[0]) : null;
  },

  // toggleDone
  async toggleDone(id) {
    const { rows } = await pool.query(
      "UPDATE todos SET done = NOT done WHERE id = $1 RETURNING *",
      [id]
    );
    return rows[0] ? toTodo(rows[0]) : null;
  },

  // delete
  async delete(id) {
    const { rowCount } = await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    return rowCount > 0;
  },
};
