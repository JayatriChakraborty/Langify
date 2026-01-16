import { useState } from "react";
import { X } from "lucide-react";

interface AddPhraseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (phrase: string, translation: string, category: string) => void;
  categories: string[];
}

export function AddPhraseModal({ isOpen, onClose, onAdd, categories }: AddPhraseModalProps) {
  const [phrase, setPhrase] = useState("");
  const [translation, setTranslation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phrase.trim() && translation.trim() && selectedCategory) {
      onAdd(phrase.trim(), translation.trim(), selectedCategory);
      setPhrase("");
      setTranslation("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-md w-full shadow-2xl border border-border">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2>Add Phrase</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-input-background rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm text-foreground mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-foreground mb-2">Phrase (in target language)</label>
            <input
              type="text"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              placeholder="e.g., ¿Cuánto cuesta?"
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-foreground mb-2">Translation (English)</label>
            <input
              type="text"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              placeholder="e.g., How much does it cost?"
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-border text-foreground hover:bg-input-background transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl bg-primary text-white hover:opacity-90 transition-opacity"
            >
              Add Phrase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}