import { View } from "react-native";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";

import type { Todo } from "../types";

interface TodoListProps {
    todos: Todo[];
    onToggle?: (id: string) => void;
    emptyMessage?: string;
}

export function TodoList({
    todos,
    onToggle,
    emptyMessage = "No todos yet. Add one to get started!",
}: TodoListProps) {
    if (todos.length === 0) {
        return (
            <View className="flex-1 items-center justify-center p-6">
                <Text className="text-muted-foreground text-center">{emptyMessage}</Text>
            </View>
        );
    }

    return (
        <Card className="mx-4 my-2">
            <CardHeader className="py-0">
                <CardTitle className="text-foreground text-lg font-semibold">
                    Your Tasks ({todos.length})
                </CardTitle>
            </CardHeader>
            <Separator className="bg-border" />
            <CardContent className="p-0">
                {todos.map((todo, index) => (
                    <View key={todo.id} className="flex-row items-center px-4 py-3 gap-3">
                        <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => onToggle?.(todo.id)}
                            aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
                        />
                        <View className="flex-1">
                            <Text
                                className={`text-foreground ${
                                    todo.completed ? "line-through text-muted-foreground" : ""
                                }`}
                                numberOfLines={1}
                            >
                                {todo.title}
                            </Text>
                        </View>
                        <Text className="text-xs text-muted-foreground">
                            {new Date(todo.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Text>
                    </View>
                ))}
            </CardContent>
        </Card>
    );
}
