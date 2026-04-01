import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface NotificationToastProps {
  message: string;
  subtext?: string;
  type?: 'success' | 'error' | 'info';
}

const NotificationToast: React.FC<NotificationToastProps> = ({ message, subtext, type = 'success' }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-bounce" role="alert" aria-live="polite" aria-atomic="true">
      <div className={`bg-white border-4 border-black p-4 shadow-lg transform rotate-1 max-w-sm`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">{getIcon()}</div>
          <div className="flex-1">
            <p className="font-bold text-sm">{message}</p>
            {subtext && <p className="text-xs text-gray-600 mt-1">{subtext}</p>}
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded border border-black"
            aria-label="Fermer la notification"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;
