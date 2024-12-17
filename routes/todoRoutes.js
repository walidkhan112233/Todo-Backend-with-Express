const express = require("express");
const TodoModel = require('../models/TodoModel');

const Route = express.Router();

Route.get("/todos", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

Route.post("/todos", async (req, res) => {
  const todo = new TodoModel({
    text: req.body.text,
    checked: req.body.checked || false,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

Route.put("/todos/:id", async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    todo.checked = !todo.checked;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

Route.delete("/todos/:id", async (req, res) => {
  try {
    await TodoModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = Route;
