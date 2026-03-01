import { API_addTodo, API_deleteTodo, API_getTodo, API_markedCompletedTodo } from "./apiPaths";

// Add a new todo
export const addItemToServer = async (task, date) => {
  try {
    const response = await fetch(API_addTodo, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, date }),
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    const item = await response.json();
    return mapServerToLocal(item);
  } catch (error) {
    console.error("Failed to add item:", error);
    return null;
  }
};

// Get all todos
export const getItemFromServer = async () => {
  try {
    const response = await fetch(API_getTodo, { method: "GET", headers: { "Content-Type": "application/json" } });
    const items = await response.json();
    return items.map(mapServerToLocal);
  } catch (error) {
    console.error("Failed to fetch items:", error);
    return [];
  }
};

// Mark a todo as completed
export const markedCompletedOnServer = async (id) => {
  try {
    const response = await fetch(API_markedCompletedTodo(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    const item = await response.json();
    return mapServerToLocal(item);
  } catch (error) {
    console.error("Failed to mark completed:", error);
    return null;
  }
};

// Delete a todo
export const deletedFromServer = async (id) => {
  try {
    const response = await fetch(API_deleteTodo(id), { method: "DELETE" });
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return id;
  } catch (error) {
    console.error("Failed to delete:", error);
    return null;
  }
};

// Map server response to local format
const mapServerToLocal = (serverItem) => ({
  id: serverItem._id,
  name: serverItem.task,
  dueDate: serverItem.date,
  completed: serverItem.completed,
  createdAt: serverItem.createdAt,
  updatedAt: serverItem.updatedAt,
});
