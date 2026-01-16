import { Plus, FileText, FolderPlus } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface AddPhraseMenuProps {
  onAddPhrase: () => void;
  onAddCategory: () => void;
}

export function AddPhraseMenu({ onAddPhrase, onAddCategory }: AddPhraseMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleAddPhrase = () => {
    setIsOpen(false);
    onAddPhrase();
  };

  const handleAddCategory = () => {
    setIsOpen(false);
    onAddCategory();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-input-background rounded-full transition-colors"
        aria-label="Add custom content"
      >
        <Plus className="w-5 h-5 text-foreground" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-border overflow-hidden z-10">
          <button
            onClick={handleAddPhrase}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-input-background transition-colors border-b border-border"
          >
            <FileText className="w-5 h-5 text-foreground" />
            <span className="text-foreground">Add Phrase</span>
          </button>
          
          <button
            onClick={handleAddCategory}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-input-background transition-colors"
          >
            <FolderPlus className="w-5 h-5 text-foreground" />
            <span className="text-foreground">Add Category</span>
          </button>
        </div>
      )}
    </div>
  );
}