import React from "react";
import { X } from "lucide-react";

export const ToastNotification = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-brand-accent border border-white/20 text-white px-6 py-4 rounded-none shadow-2xl flex items-center justify-between gap-4 max-w-md animate-slide-in">
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono tracking-widest uppercase font-bold">[LAB LOG]:</span>
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button onClick={onClose} className="text-white hover:opacity-80">
        <X size={16} />
      </button>
    </div>
  );
};
