const Todo = require("../models/todoItems.js");
exports.createTodo = async (req, res) => {
  console.log(req.body);
  const { task, date } = req.body;
  const todoItem = new Todo({ task, date });
  await todoItem.save();
  res.status(201).json(todoItem);
};
exports.getTodoItems = async (req, res) => {
  const todoItems = await Todo.find();
  res.json(todoItems);
};
exports.markedTodoItems = async (req, res) => {
  const { id } = req.params;
  const todoItems = await Todo.findById(id);
  todoItems.completed = true;
  await todoItems.save();
  res.json(todoItems);
};
exports.deleteTodoItems = async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.status(204).json({ _id: id });
};
