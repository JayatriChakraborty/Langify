import { ChevronDown, Star, Trash2 } from "lucide-react";
import { useState } from "react";

interface Phrase {
  id: string;
  text: string;
  translation: string;
  isCustom?: boolean;
}

interface PhraseCategoryProps {
  title: string;
  icon: string;
  phrases: Phrase[];
  onPhraseSelect: (phrase: Phrase) => void;
  onPhraseSave?: (phrase: Phrase) => void;
  onPhraseDelete?: (id: string) => void;
  savedPhraseIds?: Set<string>;
}

export function PhraseCategory({ title, icon, phrases, onPhraseSelect, onPhraseSave, onPhraseDelete, savedPhraseIds }: PhraseCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white">
      <button
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-input-background transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span>{title}</span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-muted-foreground transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`} 
        />
      </button>
      
      {isExpanded && (
        <div className="border-t border-border">
          {phrases.map((phrase) => (
            <div
              key={phrase.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-input-background transition-colors border-b border-border last:border-b-0"
            >
              <button
                className="flex-1 text-left"
                onClick={() => onPhraseSelect(phrase)}
              >
                <div className="text-foreground">{phrase.text}</div>
                <div className="text-sm text-muted-foreground mt-1">{phrase.translation}</div>
              </button>
              <div className="flex items-center gap-1">
                {onPhraseSave && (
                  <button
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPhraseSave(phrase);
                    }}
                    aria-label="Save phrase"
                  >
                    <Star 
                      className={`w-5 h-5 ${
                        savedPhraseIds?.has(phrase.id) 
                          ? 'fill-primary text-primary' 
                          : 'text-foreground'
                      }`} 
                    />
                  </button>
                )}
                {phrase.isCustom && onPhraseDelete && (
                  <button
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPhraseDelete(phrase.id);
                    }}
                    aria-label="Delete custom phrase"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}