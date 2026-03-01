const express=require("express")
const todoRouter=express.Router()
const todoItemController=require("../controller/todoController.js")
todoRouter.get("/todo",todoItemController.getTodoItems)
todoRouter.post("/todo",todoItemController.createTodo)
todoRouter.put("/todo/:id/completed",todoItemController.markedTodoItems)
todoRouter.delete("/todo/:id",todoItemController.deleteTodoItems)

module.exports=todoRouter