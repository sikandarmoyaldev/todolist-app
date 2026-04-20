import { Plus } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native"; // ✅ Import toast

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

import { Navbar } from "@/components/navbar";
import { TodoForm } from "@/features/todo/components/todo-form";
import { TodoList } from "@/features/todo/components/todo-list";

import { useTodos } from "@/features/todo/hooks/use-todos";
import type { Todo } from "@/features/todo/types";

export default function HomeScreen() {
    const { todos, isLoading, error, addTodo, updateTodo, toggleTodo, deleteTodo } = useTodos();
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-background">
                <Navbar title="TodoList" />
                <View className="flex-1 items-center justify-center" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 bg-background">
                <Navbar title="TodoList" />
                <View className="flex-1 items-center justify-center p-6">
                    <Text className="text-destructive text-center">Failed to load todos</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <Navbar title="TodoList" />

            {/* Add Form */}
            <View className="px-4 py-2">
                <TodoForm
                    dialogTitle="Add Task"
                    dialogDescription="Enter a title for your new todo"
                    onSubmit={async (title) => {
                        try {
                            await addTodo(title);
                            toast.success("Task added"); // ✅ Success toast
                        } catch {
                            toast.error("Failed to add task"); // ✅ Error toast
                        }
                    }}
                    trigger={
                        <Button variant="default">
                            <Icon as={Plus} size={18} />
                            <Text>Add Todo</Text>
                        </Button>
                    }
                />
            </View>

            {/* Edit Form */}
            <TodoForm
                dialogTitle="Edit Task"
                dialogDescription="Update the task title below"
                defaultTitle={editingTodo?.title ?? ""}
                open={!!editingTodo}
                onOpenChange={(open) => {
                    if (!open) setEditingTodo(null);
                }}
                onSubmit={async (newTitle) => {
                    if (editingTodo) {
                        try {
                            await updateTodo(editingTodo.id, { title: newTitle });
                            toast.success("Task updated");
                            setEditingTodo(null);
                        } catch {
                            toast.error("Failed to update task");
                        }
                    }
                }}
                trigger={<></>}
            />

            {/* Todo List */}
            <View className="flex-1">
                <TodoList
                    todos={todos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={setEditingTodo}
                />
            </View>
        </SafeAreaView>
    );
}
