import React from 'react';

interface NotificationPrefs {
  email: boolean;
  push: boolean;
  marketing: boolean;
  updates: boolean;
}

interface SettingsNotificationsProps {
  notifications: NotificationPrefs;
  onToggle: (key: keyof NotificationPrefs) => void;
}

const NOTIFICATION_ITEMS: { key: keyof NotificationPrefs; label: string; description: string }[] = [
  { key: 'email', label: 'Email', description: 'Recevoir les notifications par email' },
  { key: 'push', label: 'Notifications push', description: 'Notifications dans le navigateur' },
  { key: 'marketing', label: 'Marketing', description: 'Offres spéciales et promotions' },
  { key: 'updates', label: 'Mises à jour', description: 'Nouveautés et mises à jour de la plateforme' },
];

const SettingsNotifications: React.FC<SettingsNotificationsProps> = ({ notifications, onToggle }) => (
  <div className="space-y-6">
    <h3 className="font-['Bangers'] text-xl mb-4">Préférences de notification</h3>
    <div className="space-y-4">
      {NOTIFICATION_ITEMS.map(({ key, label, description }) => (
        <div key={key} className="flex items-center justify-between p-4 border-2 border-black">
          <div>
            <p className="font-bold">{label}</p>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <button
            onClick={() => onToggle(key)}
            className={`w-12 h-6 rounded-full border-2 border-black transition-colors ${
              notifications[key] ? 'bg-[#2563EB]' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full border-2 border-black transition-transform ${
              notifications[key] ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default SettingsNotifications;
