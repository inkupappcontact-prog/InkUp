import React from 'react';
import { Mail, X } from 'lucide-react';

interface NotificationToastProps {
  message: string;
  subtext?: string;
  onClose: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ message, subtext, onClose }) => {
  return (
    <div className="fixed top-24 right-8 z-50 animate-in slide-in-from-right duration-300 pointer-events-auto">
      <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_#000000] max-w-sm relative">
        {/* Bandeau de fermeture */}
        <button
            onClick={onClose}
            className="absolute -top-3 -right-3 bg-[#EA4335] text-white border-2 border-black p-1 shadow-[2px_2px_0px_0px_#000] hover:scale-110 transition-transform"
        >
            <X className="w-4 h-4" />
        </button>

        <div className="flex gap-4">
            <div className="bg-[#2563EB] w-12 h-12 flex items-center justify-center border-2 border-black flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
                <h4 className="font-['Bangers'] text-xl uppercase tracking-wide text-black leading-none mb-1">
                    {message}
                </h4>
                {subtext && (
                    <p className="text-sm font-bold uppercase text-gray-600 leading-tight">
                        {subtext}
                    </p>
                )}
            </div>
        </div>

        {/* Élément décoratif "Speed Lines" */}
        <div className="absolute bottom-1 right-2 flex gap-1">
            <div className="w-6 h-1 bg-black transform -skew-x-12"></div>
            <div className="w-2 h-1 bg-black transform -skew-x-12"></div>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;