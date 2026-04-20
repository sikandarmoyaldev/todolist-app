import { useState } from "react";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

interface TodoFormProps {
    trigger?: React.ReactNode;
    defaultTitle?: string;
    dialogTitle?: string;
    dialogDescription?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSubmit: (title: string) => Promise<void>;
}

export function TodoForm({
    trigger,
    defaultTitle = "",
    dialogTitle = "New Todo",
    dialogDescription,
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
    onSubmit,
}: TodoFormProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const [title, setTitle] = useState(defaultTitle);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Controlled vs uncontrolled open state
    const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setOpen = controlledOnOpenChange || setInternalOpen;

    const handleSubmit = async () => {
        if (!title.trim()) return;
        setIsSubmitting(true);
        try {
            await onSubmit(title.trim());
            setOpen(false);
            setTitle("");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpenChange = (next: boolean) => {
        setOpen(next);
        if (!next) setTitle(defaultTitle);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <Button>
                        <Text>Add Todo</Text>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    {dialogDescription && (
                        <DialogDescription>{dialogDescription}</DialogDescription>
                    )}
                </DialogHeader>
                <View className="gap-4">
                    <Input
                        placeholder="What needs to be done?"
                        value={title}
                        onChangeText={setTitle}
                        className="bg-background text-foreground border-border"
                    />
                    <View className="grid grid-cols-2 gap-2">
                        <Button variant="outline" onPress={() => setOpen(false)}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button onPress={handleSubmit} disabled={isSubmitting || !title.trim()}>
                            <Text className="text-primary-foreground">
                                {isSubmitting ? "Saving..." : "Save"}
                            </Text>
                        </Button>
                    </View>
                </View>
            </DialogContent>
        </Dialog>
    );
}
