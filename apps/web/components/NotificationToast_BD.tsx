import React from 'react';

interface NotificationToastProps {
  message: string;
  subtext?: string;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ message, subtext }) => {
  return (
    <div className="fixed top-4 right-4 bg-[#2563EB] text-black px-6 py-4 rounded-lg border-4 border-black shadow-lg z-50 max-w-sm">
      <div className="font-bold text-lg">{message}</div>
      {subtext && <div className="text-sm mt-1">{subtext}</div>}
    </div>
  );
};

export default NotificationToast;
