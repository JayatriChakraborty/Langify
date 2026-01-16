import { ChevronRight, User, FileText, LogOut } from "lucide-react";

interface SettingsPageProps {
  onNavigateToAccount: () => void;
  onNavigateToPrivacy: () => void;
  onLogout: () => void;
}

export function SettingsPage({ onNavigateToAccount, onNavigateToPrivacy, onLogout }: SettingsPageProps) {
  const settingsOptions = [
    {
      id: "account",
      label: "Account",
      icon: User,
      onClick: onNavigateToAccount,
    },
    {
      id: "privacy",
      label: "Privacy Policy",
      icon: FileText,
      onClick: onNavigateToPrivacy,
    },
    {
      id: "logout",
      label: "Logout",
      icon: LogOut,
      onClick: onLogout,
      danger: true,
    },
  ];

  return (
    <div className="p-4 space-y-3">
      <h2 className="px-1 mb-4">Settings</h2>
      
      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        {settingsOptions.map((option, index) => (
          <button
            key={option.id}
            onClick={option.onClick}
            className={`w-full flex items-center justify-between px-4 py-4 hover:bg-input-background transition-colors ${
              index !== settingsOptions.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <option.icon 
                className={`w-5 h-5 ${
                  option.danger ? "text-destructive" : "text-foreground"
                }`} 
              />
              <span className={option.danger ? "text-destructive" : "text-foreground"}>
                {option.label}
              </span>
            </div>
            {!option.danger && (
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 px-1">
        <p className="text-xs text-muted-foreground text-center">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
}
