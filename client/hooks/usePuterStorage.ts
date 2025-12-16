import { useState, useEffect, useCallback } from "react";

export interface ApiKey {
  id: string;
  label: string;
  key: string;
  createdAt: number;
}

const STORAGE_KEY = "api_keys";

export const usePuterStorage = () => {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load keys from puter storage
  useEffect(() => {
    const loadKeys = async () => {
      try {
        const puter = (window as any).puter;
        if (!puter) {
          throw new Error("Puter not initialized");
        }

        const data = await puter.kv.get(STORAGE_KEY);
        if (data) {
          setKeys(JSON.parse(data));
        }
        setIsLoaded(true);
      } catch (err) {
        console.error("Failed to load keys from puter storage:", err);
        setError((err as Error).message);
        setIsLoaded(true);
      }
    };

    loadKeys();
  }, []);

  // Save keys to puter storage
  const saveKeys = useCallback(async (newKeys: ApiKey[]) => {
    try {
      const puter = (window as any).puter;
      if (!puter) {
        throw new Error("Puter not initialized");
      }

      await puter.kv.set(STORAGE_KEY, JSON.stringify(newKeys));
      setKeys(newKeys);
      return true;
    } catch (err) {
      const errorMsg = (err as Error).message;
      setError(errorMsg);
      console.error("Failed to save keys to puter storage:", err);
      return false;
    }
  }, []);

  const addKey = useCallback(
    async (label: string, key: string) => {
      const newKey: ApiKey = {
        id: Date.now().toString(),
        label,
        key,
        createdAt: Date.now(),
      };
      const updated = [...keys, newKey];
      return saveKeys(updated);
    },
    [keys, saveKeys]
  );

  const updateKey = useCallback(
    async (id: string, label: string, key: string) => {
      const updated = keys.map((k) =>
        k.id === id ? { ...k, label, key } : k
      );
      return saveKeys(updated);
    },
    [keys, saveKeys]
  );

  const deleteKey = useCallback(
    async (id: string) => {
      const updated = keys.filter((k) => k.id !== id);
      return saveKeys(updated);
    },
    [keys, saveKeys]
  );

  const exportKeys = useCallback(() => {
    const dataStr = JSON.stringify(keys, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `api-keys-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [keys]);

  const importKeys = useCallback(
    async (file: File) => {
      try {
        const text = await file.text();

        // Try to parse the JSON
        let imported: ApiKey[];
        try {
          imported = JSON.parse(text) as ApiKey[];
        } catch (parseErr) {
          // Check if it's a non-JSON file
          if (text.trim().startsWith("#") || text.trim().startsWith("<!")) {
            throw new Error(
              "Invalid file format. Please import a JSON file exported from this app."
            );
          }
          // Check for common issues
          if (text.includes("---") || text.includes("...")) {
            throw new Error(
              "File contains YAML or markdown formatting. Please use the JSON export from this app."
            );
          }
          throw new Error(
            `Invalid JSON format. ${(parseErr as Error).message}`
          );
        }

        // Validate structure
        if (!Array.isArray(imported)) {
          throw new Error(
            "Invalid format: JSON must be an array of API keys. Expected format: [{\"label\": \"...\", \"key\": \"...\"}, ...]"
          );
        }

        if (imported.length === 0) {
          throw new Error("The imported file contains no API keys.");
        }

        for (const item of imported) {
          if (
            !item.label ||
            !item.key ||
            typeof item.label !== "string" ||
            typeof item.key !== "string"
          ) {
            throw new Error(
              "Invalid format: each item must have 'label' and 'key' as strings"
            );
          }
        }

        // Merge with existing keys, avoiding duplicates by label
        const existingLabels = new Set(keys.map((k) => k.label));
        const newKeys = imported.filter((k) => !existingLabels.has(k.label));

        if (newKeys.length === 0) {
          throw new Error(
            "All keys in the imported file already exist (duplicates detected)."
          );
        }

        const merged = [
          ...keys,
          ...newKeys.map((k) => ({
            ...k,
            id: k.id || Date.now().toString(),
            createdAt: k.createdAt || Date.now(),
          })),
        ];

        return saveKeys(merged);
      } catch (err) {
        const errorMsg = (err as Error).message;
        setError(errorMsg);
        console.error("Failed to import keys:", err);
        return false;
      }
    },
    [keys, saveKeys]
  );

  return {
    keys,
    isLoaded,
    error,
    addKey,
    updateKey,
    deleteKey,
    exportKeys,
    importKeys,
    setError,
  };
};
