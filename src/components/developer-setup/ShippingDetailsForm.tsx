import { ChevronDownIcon } from 'lucide-react';
import React, { useState } from 'react';

interface ShippingDetailsFormProps {
  value: any;
  onChange: (val: any) => void;
  shippingType: 'residential' | 'office';
  setShippingType: (type: 'residential' | 'office') => void;
}

export function ShippingDetailsForm({ value, onChange, shippingType, setShippingType }: ShippingDetailsFormProps) {
  const [touched, setTouched] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const requiredFieldsResidential = [
    'firstName',
    'lastName',
    'address1',
    'country',
    'city',
    'zip',
    'phone',
  ];
  const requiredFieldsOffice = [
    'officeFirstName',
    'officeLastName',
    'officeLocation',
    'buildingNumber',
    'workspaceLocation',
  ];

  const validate = (field: string, val: any) => {
    if (
      (shippingType === 'residential' && requiredFieldsResidential.includes(field)) ||
      (shippingType === 'office' && requiredFieldsOffice.includes(field))
    ) {
      if (!val || val.trim() === '') {
        return 'This field is required.';
      }
      if (field === 'zip') {
        if (!/^\d{5}$/.test(val)) {
          return 'ZIP code must be exactly 5 digits.';
        }
      }
      if (field === 'phone') {
        // Accepts (123)4567890, (123) 456-7890, (123)456-7890, (123) 4567890
        const phonePattern = /^\(\d{3}\)[ ]?\d{3}-?\d{4}$/;
        if (!phonePattern.test(val)) {
          return 'Phone must be 10 digits with area code in parentheses, e.g., (123) 456-7890.';
        }
      }
    }
    return '';
  };

  const formatPhone = (input: string) => {
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, '');
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value: val } = e.target;
    let newValue = val;
    if (name === 'phone') {
      newValue = formatPhone(val);
    }
    onChange((prev: any) => ({ ...prev, [name]: newValue }));
    if (touched[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: validate(name, newValue) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value: val } = e.target;
    setTouched((prev: any) => ({ ...prev, [name]: true }));
    setErrors((prev: any) => ({ ...prev, [name]: validate(name, val) }));
  };

  return (
    <div className="px-6 py-4">
      <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>
      <div className="flex items-center gap-6 mb-4">
        <label className="flex items-center cursor-pointer">
          <input type="radio" name="shippingType" value="residential" checked={shippingType === 'residential'} onChange={() => setShippingType('residential')} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
          <span className="ml-2 text-sm font-medium text-gray-700">Shipping to a residential address</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input type="radio" name="shippingType" value="office" checked={shippingType === 'office'} onChange={() => setShippingType('office')} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
          <span className="ml-2 text-sm font-medium text-gray-700">Shipping to an EA office</span>
        </label>
      </div>
      {shippingType === 'residential' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name<span className="text-red-500">*</span></label>
            <input type="text" id="firstName" name="firstName" placeholder="Janet" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.firstName} onChange={handleChange} onBlur={handleBlur} />
            {touched.firstName && errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name<span className="text-red-500">*</span></label>
            <input type="text" id="lastName" name="lastName" placeholder="Smith" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.lastName} onChange={handleChange} onBlur={handleBlur} />
            {touched.lastName && errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">Address<span className="text-red-500">*</span></label>
            <input type="text" id="address1" name="address1" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.address1} onChange={handleChange} onBlur={handleBlur} />
            {touched.address1 && errors.address1 && <p className="text-red-500 text-xs mt-1">{errors.address1}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">Address line 2</label>
            <input type="text" id="address2" name="address2" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.address2} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country<span className="text-red-500">*</span></label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="country"
                name="country"
                value={value.country}
                onChange={handleChange}
                onBlur={handleBlur}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option value="">Select</option>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
              <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </div>
            {touched.country && errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City/Town<span className="text-red-500">*</span></label>
            <input type="text" id="city" name="city" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.city} onChange={handleChange} onBlur={handleBlur} />
            {touched.city && errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Postcode / ZIP<span className="text-red-500">*</span></label>
            <input type="text" id="zip" name="zip" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.zip} onChange={handleChange} onBlur={handleBlur} />
            {touched.zip && errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone<span className="text-red-500">*</span></label>
            <input type="tel" id="phone" name="phone" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.phone} onChange={handleChange} onBlur={handleBlur} />
            {touched.phone && errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="shippingInfo" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
            <textarea id="shippingInfo" name="shippingInfo" placeholder="Additional information" rows={4} className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.shippingInfo} onChange={handleChange}></textarea>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="officeFirstName" className="block text-sm font-medium text-gray-700 mb-1">First Name<span className="text-red-500">*</span></label>
            <input type="text" id="officeFirstName" name="officeFirstName" placeholder="Janet" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.officeFirstName} onChange={handleChange} onBlur={handleBlur} />
            {touched.officeFirstName && errors.officeFirstName && <p className="text-red-500 text-xs mt-1">{errors.officeFirstName}</p>}
          </div>
          <div>
            <label htmlFor="officeLastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name<span className="text-red-500">*</span></label>
            <input type="text" id="officeLastName" name="officeLastName" placeholder="Smith" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.officeLastName} onChange={handleChange} onBlur={handleBlur} />
            {touched.officeLastName && errors.officeLastName && <p className="text-red-500 text-xs mt-1">{errors.officeLastName}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="officeLocation" className="block text-sm font-medium text-gray-700 mb-1">Office Location<span className="text-red-500">*</span></label>
            <div className="mt-2 grid grid-cols-1">
              <select id="officeLocation" name="officeLocation" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600 sm:text-sm/6" value={value.officeLocation} onChange={handleChange} onBlur={handleBlur}>
                <option value="">Select</option>
                <option>Austin</option>
                <option>Kirkland</option>
                <option>Los Angeles - Chatsworth</option>
                <option>Los Angeles - Del Rey</option>
                <option>Orlando</option>
                <option>Redwood Shores</option>
              </select>
              <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            {touched.officeLocation && errors.officeLocation && <p className="text-red-500 text-xs mt-1">{errors.officeLocation}</p>}
          </div>
          <div>
            <label htmlFor="buildingNumber" className="block text-sm font-medium text-gray-700 mb-1">Building Number<span className="text-red-500">*</span></label>
            <input type="text" id="buildingNumber" name="buildingNumber" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.buildingNumber} onChange={handleChange} onBlur={handleBlur} />
            {touched.buildingNumber && errors.buildingNumber && <p className="text-red-500 text-xs mt-1">{errors.buildingNumber}</p>}
          </div>
          <div>
            <label htmlFor="workspaceLocation" className="block text-sm font-medium text-gray-700 mb-1">Workspace Location<span className="text-red-500">*</span></label>
            <input type="text" id="workspaceLocation" name="workspaceLocation" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.workspaceLocation} onChange={handleChange} onBlur={handleBlur} />
            {touched.workspaceLocation && errors.workspaceLocation && <p className="text-red-500 text-xs mt-1">{errors.workspaceLocation}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="officeShippingInfo" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
            <textarea id="officeShippingInfo" name="officeShippingInfo" placeholder="Additional information" rows={4} className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.officeShippingInfo} onChange={handleChange}></textarea>
          </div>
        </div>
      )}
    </div>
  );
} 