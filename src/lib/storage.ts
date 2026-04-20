import AsyncStorage from "@react-native-async-storage/async-storage";

export const TODO_STORAGE_KEY = "@todolist_app_data";

// Generic storage helpers
export const storage = {
    get: async <T>(key: string): Promise<T | null> => {
        try {
            const raw = await AsyncStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },
    set: async <T>(key: string, value: T): Promise<void> => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Storage set error:", error);
        }
    },
    remove: async (key: string): Promise<void> => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error("Storage remove error:", error);
        }
    },
};
