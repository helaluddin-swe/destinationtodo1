const API_PORT = "http://localhost:8000/api/todo";

export const API_addTodo = API_PORT;
export const API_getTodo = API_PORT;

// For deleting a todo by ID
export const API_deleteTodo = (id) => `${API_PORT}/${id}`;

// For marking a todo as completed by ID
export const API_markedCompletedTodo = (id) => `${API_PORT}/${id}/completed`;
