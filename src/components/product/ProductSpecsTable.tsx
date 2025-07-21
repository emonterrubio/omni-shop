import React from 'react';

interface Spec {
  label: string;
  value: any;
}

interface ProductSpecsTableProps {
  specs?: Spec[];
}

export function ProductSpecsTable({ specs = [] }: ProductSpecsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {specs.length > 0 ? (
          specs.filter(s => s.value).map((spec, idx) => (
            <div className="border-b border-gray-200 pb-3" key={idx}>
              <div className="text-base font-semibold">{spec.label}</div>
              <div className="text-sm text-gray-700">{spec.value}</div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-gray-400">No specifications available.</div>
        )}
      </div>
    </div>
  );
} 