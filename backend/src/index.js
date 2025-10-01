import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { pool, ensureSchema } from "./db.js";

configDotenv();

const app = express();
const port = process.env.PORT || 4000;
const corsOrigin = process.env.CORS_ORIGIN || "*";

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/ideas", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, text, votes, created_at FROM ideas ORDER BY votes DESC, created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ideas" });
  }
});

app.post("/ideas", async (req, res) => {
  try {
    const { text } = req.body || {};
    if (
      !text ||
      typeof text !== "string" ||
      text.length === 0 ||
      text.length > 280
    ) {
      return res
        .status(400)
        .json({ error: "Text is required and must be <= 280 chars" });
    }
    const result = await pool.query(
      "INSERT INTO ideas (text) VALUES ($1) RETURNING id, text, votes, created_at",
      [text.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create idea" });
  }
});

app.post("/ideas/:id/upvote", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const result = await pool.query(
      "UPDATE ideas SET votes = votes + 1 WHERE id = $1 RETURNING id, text, votes, created_at",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Idea not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to upvote" });
  }
});

async function start() {
  try {
    await ensureSchema();
    app.listen(port, () => {
      console.log(`Backend listening on :${port}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

start();
