"use client";

import React from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { Toast } from "../ToastContext";

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const toastStyles = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export function ToastComponent({ toast, onRemove }: ToastProps) {
  const IconComponent = toastIcons[toast.type];

  return (
    <div
      className={`flex items-center justify-between p-4 border rounded-lg shadow-sm ${toastStyles[toast.type]} animate-in slide-in-from-top-2 duration-300`}
      role="alert"
    >
      <div className="flex items-center space-x-3">
        <IconComponent className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
} 