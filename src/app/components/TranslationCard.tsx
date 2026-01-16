import { Mic, Volume2, Copy, X, Star } from "lucide-react";
import { useState } from "react";

interface TranslationCardProps {
  type: "input" | "output";
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onSave?: () => void;
  isSaved?: boolean;
}

export function TranslationCard({ type, value, onChange, placeholder, onSave, isSaved }: TranslationCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    onChange?.("");
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
      <div className="p-4 min-h-[160px]">
        {type === "input" ? (
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full min-h-[128px] resize-none bg-transparent border-0 outline-none placeholder:text-muted-foreground"
          />
        ) : (
          <div className="text-foreground min-h-[128px]">
            {value || <span className="text-muted-foreground">{placeholder}</span>}
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between px-4 py-3 bg-input-background/50 border-t border-border">
        <div className="flex items-center gap-2">
          <button 
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label={type === "input" ? "Voice input" : "Play translation"}
          >
            {type === "input" ? (
              <Mic className="w-5 h-5 text-foreground" />
            ) : (
              <Volume2 className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          {value && (
            <>
              <button 
                className="p-2 hover:bg-muted rounded-full transition-colors"
                onClick={handleCopy}
                aria-label="Copy text"
              >
                <Copy className={`w-5 h-5 ${isCopied ? 'text-primary' : 'text-foreground'}`} />
              </button>
              {type === "output" && onSave && (
                <button 
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                  onClick={onSave}
                  aria-label="Save translation"
                >
                  <Star className={`w-5 h-5 ${isSaved ? 'fill-primary text-primary' : 'text-foreground'}`} />
                </button>
              )}
              {type === "input" && (
                <button 
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                  onClick={handleClear}
                  aria-label="Clear text"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}