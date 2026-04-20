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
    onSubmit: (title: string) => Promise<void>;
}

export function TodoForm({
    trigger,
    defaultTitle = "",
    dialogTitle = "New Todo",
    dialogDescription,
    onSubmit,
}: TodoFormProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(defaultTitle);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                    <DialogTitle className="text-foreground text-xl font-semibold">
                        {dialogTitle}
                    </DialogTitle>
                    {dialogDescription && (
                        <DialogDescription className="text-muted-foreground">
                            {dialogDescription}
                        </DialogDescription>
                    )}
                </DialogHeader>
                <View className="gap-4 py-4">
                    <Input
                        placeholder="What needs to be done?"
                        value={title}
                        onChangeText={setTitle}
                        className="bg-background text-foreground border-border"
                    />
                    <View className="flex-row justify-end gap-2">
                        <Button variant="ghost" onPress={() => setOpen(false)}>
                            <Text className="text-muted-foreground">Cancel</Text>
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
