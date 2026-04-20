import { Plus } from "lucide-react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

import { Navbar } from "@/components/navbar";
import { TodoForm } from "@/features/todo/components/todo-form";
import { TodoList } from "@/features/todo/components/todo-list";

import { useTodos } from "@/features/todo/hooks/use-todos";

export default function HomeScreen() {
    const { todos, isLoading, error, addTodo, toggleTodo, deleteTodo } = useTodos();

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

            <View className="px-4 py-2">
                <TodoForm
                    dialogTitle="Add Task"
                    dialogDescription="Enter a title for your new todo"
                    onSubmit={async (title) => addTodo(title)}
                    trigger={
                        <Button variant="default">
                            <Icon as={Plus} size={18} />
                            <Text>Add Todo</Text>
                        </Button>
                    }
                />
            </View>

            <View className="flex-1">
                <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
            </View>
        </SafeAreaView>
    );
}
