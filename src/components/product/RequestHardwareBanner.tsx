import React from 'react';
import Link from 'next/link';

export function RequestHardwareBanner() {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center mt-8">
      <div className="text-2xl text-center font-medium mb-1">Need something not in our catalog?</div>
      <div className="mb-3 text-gray-600 text-base text-center">Request specialized hardware for your unique business needs</div>
      <Link 
        href="/request-hardware"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Request hardware
      </Link>
    </div>
  );
} 