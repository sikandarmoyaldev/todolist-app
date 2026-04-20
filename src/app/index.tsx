import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Navbar } from "@/components/navbar";
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
                    {/* You might need to import Text here if not using a wrapper */}
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <Navbar title="TodoList" />
            <View className="flex-1">
                <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
            </View>
        </SafeAreaView>
    );
}
