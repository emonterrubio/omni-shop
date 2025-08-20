import React from 'react';
import Link from 'next/link';

export function RequestHardwareBanner() {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col items-center mt-8">
      <div className="text-xl lg:text-2xl text-center font-semibold mb-2 text-gray-900">Find the right hardware for your needs</div>
      <div className="mb-4 text-sm lg:text-base text-gray-600 text-center font-regular">Quickly discover IT-approved devices that fit your work.</div>
      <Link 
        href="/find-hardware"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm lg:text-base"
      >
        Find my hardware
      </Link>
    </div>
  );
} 