import { ChevronLeft, User, Mail, Calendar, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface AccountPageProps {
  onBack: () => void;
}

export function AccountPage({ onBack }: AccountPageProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAccount = () => {
    // In a real app, this would make an API call
    alert("Account deletion request submitted. This is a demo, so your account wasn't actually deleted.");
    setShowDeleteConfirm(false);
  };

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-border px-4 py-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-input-background rounded-full transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2>Account</h2>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h3 className="mb-1">Demo User</h3>
            <p className="text-sm text-muted-foreground">Free Plan</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-input-background">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-foreground">demo@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-input-background">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="text-foreground">January 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
          <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-input-background transition-colors border-b border-border">
            <span className="text-foreground">Edit Profile</span>
            <span className="text-sm text-muted-foreground">→</span>
          </button>
          
          <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-input-background transition-colors border-b border-border">
            <span className="text-foreground">Change Password</span>
            <span className="text-sm text-muted-foreground">→</span>
          </button>

          <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-input-background transition-colors">
            <span className="text-foreground">Language Preferences</span>
            <span className="text-sm text-muted-foreground">→</span>
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-sm border border-destructive overflow-hidden">
          <div className="px-4 py-3 bg-destructive/5 border-b border-destructive/20">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="text-sm text-destructive">Danger Zone</span>
            </div>
          </div>
          
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full px-4 py-4 hover:bg-destructive/5 transition-colors"
          >
            <span className="text-destructive">Delete Account</span>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-md w-full shadow-2xl border border-border">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              
              <h3 className="text-center mb-2">Delete Account?</h3>
              <p className="text-sm text-muted-foreground text-center mb-6">
                This action cannot be undone. All your data, including saved translations and custom phrases, will be permanently deleted.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-border text-foreground hover:bg-input-background transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-3 rounded-xl bg-destructive text-white hover:opacity-90 transition-opacity"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}