import type { Todo } from "@/features/todo/types";

import { TODO_STORAGE_KEY, storage } from "@/lib/storage";

// Get all todos from storage
export async function getTodos(): Promise<Todo[]> {
    const data = await storage.get<Todo[]>(TODO_STORAGE_KEY);
    return Array.isArray(data) ? data : [];
}

// Get one todo by ID
export async function getTodoById(id: string): Promise<Todo | undefined> {
    const todos = await getTodos();
    return todos.find((todo) => todo.id === id);
}

// Add a new todo to the list
export async function addTodo(todo: Todo): Promise<Todo[]> {
    const todos = await getTodos();
    const updated = [todo, ...todos];
    await storage.set(TODO_STORAGE_KEY, updated);
    return updated;
}

// Update an existing todo by ID
export async function updateTodoById(id: string, updates: Partial<Todo>): Promise<Todo[]> {
    const todos = await getTodos();
    const updated = todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo));
    await storage.set(TODO_STORAGE_KEY, updated);
    return updated;
}

// Delete a todo by ID
export async function deleteTodoById(id: string): Promise<Todo[]> {
    const todos = await getTodos();
    const updated = todos.filter((todo) => todo.id !== id);
    await storage.set(TODO_STORAGE_KEY, updated);
    return updated;
}

// Clear all todos
export async function clearAllTodos(): Promise<void> {
    await storage.remove(TODO_STORAGE_KEY);
}
