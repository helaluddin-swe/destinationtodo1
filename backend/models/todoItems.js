const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
