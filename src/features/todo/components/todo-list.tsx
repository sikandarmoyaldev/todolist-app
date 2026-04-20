import { Pencil, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";

import type { Todo } from "../types";

interface TodoListProps {
    todos: Todo[];
    onToggle?: (id: string) => void;
    onDelete?: (id: string) => void;
    onEdit?: (todo: Todo) => void;
    emptyMessage?: string;
}

export function TodoList({
    todos,
    onToggle,
    onDelete,
    onEdit,
    emptyMessage = "No todos yet. Add one to get started!",
}: TodoListProps) {
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

    if (todos.length === 0) {
        return (
            <View className="flex-1 items-center justify-center p-6">
                <Text className="text-muted-foreground text-center">{emptyMessage}</Text>
            </View>
        );
    }

    return (
        <>
            <Card className="mx-4 my-2">
                <CardHeader className="py-0">
                    <CardTitle>Your Tasks ({todos.length})</CardTitle>
                </CardHeader>
                <Separator className="bg-border" />
                <CardContent className="p-0">
                    {todos.map((todo) => (
                        <View key={todo.id} className="flex-row items-center px-4 gap-2">
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
                            <View className="flex-row">
                                {onEdit && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onPress={() => onEdit(todo)}
                                        aria-label={`Edit "${todo.title}"`}
                                    >
                                        <Icon as={Pencil} className="text-foreground" size={18} />
                                    </Button>
                                )}
                                {/* ✅ Trash triggers local state → opens AlertDialog */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onPress={() => setPendingDeleteId(todo.id)}
                                    aria-label={`Delete "${todo.title}"`}
                                >
                                    <Icon as={Trash2} className="text-destructive" size={18} />
                                </Button>
                            </View>
                        </View>
                    ))}
                </CardContent>
            </Card>

            {/* ✅ Controlled AlertDialog */}
            <AlertDialog
                open={!!pendingDeleteId}
                onOpenChange={(open: boolean) => !open && setPendingDeleteId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. The task will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            <Text>Cancel</Text>
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="text-background bg-destructive"
                            onPress={() => {
                                if (pendingDeleteId) onDelete?.(pendingDeleteId);
                                setPendingDeleteId(null);
                            }}
                        >
                            <Text>Delete</Text>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
