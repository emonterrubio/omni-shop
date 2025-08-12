import React, { useState } from 'react';

interface BillingDetailsFormProps {
  value: {
    name: string;
    lastName: string;
    costCenter: string;
    businessUnit: string;
    department: string;
    info: string;
  };
  onChange: (val: any) => void;
}

export function BillingDetailsForm({ value, onChange }: BillingDetailsFormProps) {
  const [touched, setTouched] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const requiredFields = ['manager', 'lastName'];

  const validate = (field: string, val: any) => {
    if (requiredFields.includes(field)) {
      if (!val || val.trim() === '') {
        return 'This field is required.';
      }
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value: val } = e.target;
    onChange((prev: any) => ({ ...prev, [name]: val }));
    if (touched[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: validate(name, val) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value: val } = e.target;
    setTouched((prev: any) => ({ ...prev, [name]: true }));
    setErrors((prev: any) => ({ ...prev, [name]: validate(name, val) }));
  };
  return (
    <div className="px-2 py-2 sm:px-6 sm:py-4">
      <h3 className="text-2xl font-regular mb-4">Billing Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="manager" className="block text-sm font-medium text-gray-700 mb-1">Manager<span className="text-red-500">*</span></label>
          <input type="text" id="manager" name="name" placeholder="Marlon Richardson" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.name} onChange={handleChange} onBlur={handleBlur} />
          {touched.name && errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="costCenter" className="block text-sm font-medium text-gray-700 mb-1">Cost Center</label>
          <input type="text" id="costCenter" name="costCenter" placeholder="1220-EAIT" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.costCenter} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="businessUnit" className="block text-sm font-medium text-gray-700 mb-1">Business Unit</label>
          <input type="text" id="businessUnit" name="businessUnit" placeholder="110" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.businessUnit} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <input type="text" id="department" name="department" placeholder="110" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.department} onChange={handleChange} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="billingInfo" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
          <textarea id="billingInfo" name="info" placeholder="Additional information" rows={4} className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.info} onChange={handleChange}></textarea>
        </div>
      </div>
    </div>
  );
} 