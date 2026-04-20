import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Navbar } from "@/components/navbar";
import { TodoList } from "@/features/todo/components/todo-list";
import type { Todo } from "@/features/todo/types";

export default function HomeScreen() {
    const todos: Todo[] = [
        { id: "1", title: "Buy groceries", completed: false, createdAt: Date.now() },
        { id: "2", title: "Walk the dog", completed: true, createdAt: Date.now() - 3600000 },
    ];

    const handleToggle = (id: string) => {
        console.log("Toggle todo:", id);
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            {/* ✅ Navbar at top */}
            <Navbar title="TodoList" />

            {/* ✅ Content below navbar */}
            <View className="flex-1">
                <TodoList todos={todos} onToggle={handleToggle} />
            </View>
        </SafeAreaView>
    );
}
