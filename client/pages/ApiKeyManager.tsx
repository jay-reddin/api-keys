import { useState, useRef } from "react";
import { usePuterStorage, ApiKey } from "@/hooks/usePuterStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Edit2,
  Download,
  Upload,
  Plus,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";

export default function ApiKeyManager() {
  const {
    keys,
    isLoaded,
    error,
    addKey,
    updateKey,
    deleteKey,
    exportKeys,
    importKeys,
    setError,
  } = usePuterStorage();

  const [label, setLabel] = useState("");
  const [key, setKey] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleReveal = (id: string) => {
    const newRevealed = new Set(revealedKeys);
    if (newRevealed.has(id)) {
      newRevealed.delete(id);
    } else {
      newRevealed.add(id);
    }
    setRevealedKeys(newRevealed);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${label} to clipboard`);
  };

  const handleAddOrUpdate = async () => {
    if (!label.trim() || !key.trim()) {
      toast.error("Please fill in both label and key");
      return;
    }

    let success = false;
    if (editingId) {
      success = await updateKey(editingId, label, key);
      if (success) {
        toast.success("Key updated successfully");
        setEditingId(null);
      }
    } else {
      success = await addKey(label, key);
      if (success) {
        toast.success("Key added successfully");
      }
    }

    if (success) {
      setLabel("");
      setKey("");
    }
  };

  const handleEdit = (apiKey: ApiKey) => {
    setEditingId(apiKey.id);
    setLabel(apiKey.label);
    setKey(apiKey.key);
  };

  const handleCancel = () => {
    setEditingId(null);
    setLabel("");
    setKey("");
  };

  const handleDeleteKey = async (id: string) => {
    const success = await deleteKey(id);
    if (success) {
      toast.success("Key deleted successfully");
      setRevealedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleExport = () => {
    if (keys.length === 0) {
      toast.error("No keys to export");
      return;
    }
    exportKeys();
    toast.success("Keys exported successfully");
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const success = await importKeys(file);
    if (success) {
      toast.success("Keys imported successfully");
    } else {
      toast.error("Failed to import keys");
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">API Keys</span>
          </div>
          <a
            href="/"
            className="text-slate-300 hover:text-white transition text-sm"
          >
            Home
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-2 underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Add/Edit Form */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            {editingId ? "Edit API Key" : "Add New API Key"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Label
              </label>
              <Input
                type="text"
                placeholder="e.g., OpenAI, Stripe, GitHub"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                API Key
              </label>
              <Input
                type="password"
                placeholder="Paste your API key here"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddOrUpdate}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                {editingId ? "Update Key" : "Add Key"}
              </Button>

              {editingId && (
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="text-white border-slate-700 hover:bg-slate-800"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Import/Export Actions */}
        <div className="mb-8">
          <div className="flex gap-3 mb-3">
            <Button
              onClick={handleExport}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>

            <Button
              onClick={handleImportClick}
              variant="outline"
              className="text-white border-slate-700 hover:bg-slate-800"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Keys
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.txt,.text"
              onChange={handleImportFile}
              className="hidden"
            />
          </div>

          <p className="text-xs text-slate-400">
            💡 Supports JSON format or text files with PROVIDER=..., KEY=... format
          </p>
        </div>

        {/* Keys List */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            Saved Keys ({keys.length})
          </h3>

          {keys.length === 0 ? (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center">
              <p className="text-slate-400">
                No API keys saved yet. Add your first key above!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {keys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold mb-2">
                        {apiKey.label}
                      </h4>
                      <div className="flex items-center gap-2">
                        <code className="bg-slate-900/50 text-slate-300 px-3 py-2 rounded text-sm break-all font-mono">
                          {revealedKeys.has(apiKey.id)
                            ? apiKey.key
                            : "•".repeat(Math.min(apiKey.key.length, 40))}
                        </code>
                        <button
                          onClick={() => toggleReveal(apiKey.id)}
                          className="p-2 hover:bg-slate-700 rounded transition flex-shrink-0"
                          title={
                            revealedKeys.has(apiKey.id) ? "Hide" : "Reveal"
                          }
                        >
                          {revealedKeys.has(apiKey.id) ? (
                            <EyeOff className="w-4 h-4 text-slate-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                        <button
                          onClick={() => copyToClipboard(apiKey.key, apiKey.label)}
                          className="p-2 hover:bg-slate-700 rounded transition flex-shrink-0"
                          title="Copy to clipboard"
                        >
                          <Copy className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Added {new Date(apiKey.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(apiKey)}
                        className="p-2 hover:bg-slate-700 rounded transition"
                        title="Edit key"
                      >
                        <Edit2 className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteKey(apiKey.id)}
                        className="p-2 hover:bg-slate-700 rounded transition"
                        title="Delete key"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-24">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <p className="text-slate-400 text-center">
            © 2024 API Key Manager. Your keys are stored securely with Puter.
          </p>
        </div>
      </footer>
    </div>
  );
}
