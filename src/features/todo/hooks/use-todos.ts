import { useCallback, useEffect, useState } from "react";

import { addTodo, deleteTodoById, getTodos, updateTodoById } from "@/features/todo/services";
import type { Todo } from "@/features/todo/types";

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load todos from storage on mount
    useEffect(() => {
        let mounted = true;

        const load = async () => {
            try {
                const data = await getTodos();
                if (mounted) setTodos(data);
            } catch {
                if (mounted) setError("Failed to load todos");
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        load();
        return () => {
            mounted = false;
        };
    }, []);

    // Add a new todo
    const handleAdd = useCallback(async (title: string) => {
        if (!title.trim()) return;
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title: title.trim(),
            completed: false,
            createdAt: Date.now(),
        };
        const updated = await addTodo(newTodo);
        setTodos(updated);
    }, []);

    // Toggle completed state
    const handleToggle = useCallback(
        async (id: string) => {
            const todo = todos.find((t) => t.id === id);
            if (!todo) return;
            const updated = await updateTodoById(id, { completed: !todo.completed });
            setTodos(updated);
        },
        [todos],
    );

    // Update todo fields
    const handleUpdate = useCallback(async (id: string, updates: Partial<Todo>) => {
        const updated = await updateTodoById(id, updates);
        setTodos(updated);
    }, []);

    // Delete a todo
    const handleDelete = useCallback(async (id: string) => {
        const updated = await deleteTodoById(id);
        setTodos(updated);
    }, []);

    return {
        todos,
        isLoading,
        error,
        addTodo: handleAdd,
        toggleTodo: handleToggle,
        updateTodo: handleUpdate,
        deleteTodo: handleDelete,
    };
}
