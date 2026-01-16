import { ChevronLeft } from "lucide-react";

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
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
          <h2>Privacy Policy</h2>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-border p-6 space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Last updated: January 10, 2026
            </p>
          </div>

          <div>
            <h3 className="mb-3">1. Information We Collect</h3>
            <p className="text-sm text-muted-foreground mb-3">
              We collect information you provide directly to us when you create an account, use our translation services, and save phrases or translations.
            </p>
            <p className="text-sm text-muted-foreground">
              This includes your email address, translation history, saved phrases, and language preferences.
            </p>
          </div>

          <div>
            <h3 className="mb-3">2. How We Use Your Information</h3>
            <p className="text-sm text-muted-foreground mb-3">
              We use the information we collect to:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your experience</li>
              <li>Sync your data across devices</li>
              <li>Send you technical notices and support messages</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3">3. Data Storage and Security</h3>
            <p className="text-sm text-muted-foreground">
              Your data is stored securely using industry-standard encryption. We implement appropriate technical and organizational measures to protect your personal information.
            </p>
          </div>

          <div>
            <h3 className="mb-3">4. Sharing Your Information</h3>
            <p className="text-sm text-muted-foreground">
              We do not sell, trade, or otherwise transfer your personal information to third parties. We may share information with service providers who assist us in operating our application.
            </p>
          </div>

          <div>
            <h3 className="mb-3">5. Your Rights</h3>
            <p className="text-sm text-muted-foreground mb-3">
              You have the right to:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3">6. Changes to This Policy</h3>
            <p className="text-sm text-muted-foreground">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </div>

          <div>
            <h3 className="mb-3">7. Contact Us</h3>
            <p className="text-sm text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at privacy@translateapp.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}