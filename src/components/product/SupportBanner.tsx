import React from 'react';

export function SupportBanner() {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center mt-12">
      <div className="text-2xl font-medium mb-1">Still need help?</div>
      <div className="mb-3 text-gray-600 text-center text-base">Talk to one of our IT experts</div>
      <button className="bg-blue-600 text-white px-6 py-2 rounded">Start a Conversation</button>
    </div>
  );
} 