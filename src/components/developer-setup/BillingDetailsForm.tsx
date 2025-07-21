import React, { useState } from 'react';

interface BillingDetailsFormProps {
  value: {
    name: string;
    lastName: string;
    costCenter: string;
    building: string;
    info: string;
  };
  onChange: (val: any) => void;
}

export function BillingDetailsForm({ value, onChange }: BillingDetailsFormProps) {
  const [touched, setTouched] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const requiredFields = ['name', 'lastName'];

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
    <div className="px-6 py-4">
      <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="billingName" className="block text-sm font-medium text-gray-700 mb-1">Name<span className="text-red-500">*</span></label>
          <input type="text" id="billingName" name="name" placeholder="Marlon" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.name} onChange={handleChange} onBlur={handleBlur} />
          {touched.name && errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="billingLastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name<span className="text-red-500">*</span></label>
          <input type="text" id="billingLastName" name="lastName" placeholder="Richardson" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.lastName} onChange={handleChange} onBlur={handleBlur} />
          {touched.lastName && errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="costCenter" className="block text-sm font-medium text-gray-700 mb-1">Cost Center</label>
          <input type="text" id="costCenter" name="costCenter" placeholder="1220-EAIT" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.costCenter} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="building" className="block text-sm font-medium text-gray-700 mb-1">Building</label>
          <input type="text" id="building" name="building" placeholder="110" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.building} onChange={handleChange} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="billingInfo" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
          <textarea id="billingInfo" name="info" placeholder="Additional information" rows={4} className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.info} onChange={handleChange}></textarea>
        </div>
      </div>
    </div>
  );
} 