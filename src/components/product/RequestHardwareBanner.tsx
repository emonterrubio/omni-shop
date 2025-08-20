import React from 'react';
import Link from 'next/link';

export function RequestHardwareBanner() {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col items-center mt-8">
      <div className="text-2xl text-center font-medium mb-1">Find the right hardware for your needs</div>
      <div className="mb-3 text-gray-600 text-base text-center">Quickly discover IT-approved devices that fit your work.</div>
      <Link 
        href="/find-hardware"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Find my hardware
      </Link>
    </div>
  );
} 