import { ChevronDownIcon } from 'lucide-react';
import React, { useState } from 'react';

interface ShippingDetailsFormProps {
  value: any;
  onChange: (val: any) => void;
  shippingType: 'residential' | 'office';
  setShippingType: (type: 'residential' | 'office') => void;
}

export function ShippingDetailsForm({ value, onChange, shippingType, setShippingType }: ShippingDetailsFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value: val } = e.target;
    onChange((prev: any) => ({ ...prev, [name]: val }));
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
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input type="text" id="firstName" name="firstName" placeholder="Janet" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.firstName} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input type="text" id="lastName" name="lastName" placeholder="Smith" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.lastName} onChange={handleChange} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
            <input type="text" id="address1" name="address1" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.address1} onChange={handleChange} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">Address line 2</label>
            <input type="text" id="address2" name="address2" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.address2} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="country"
                name="country"
                value={value.country}
                onChange={handleChange}
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
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City/Town*</label>
            <input type="text" id="city" name="city" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.city} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Postcode / ZIP*</label>
            <input type="text" id="zip" name="zip" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.zip} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
            <input type="tel" id="phone" name="phone" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.phone} onChange={handleChange} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="shippingInfo" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
            <textarea id="shippingInfo" name="shippingInfo" placeholder="Additional information" rows={4} className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.shippingInfo} onChange={handleChange}></textarea>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="officeFirstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input type="text" id="officeFirstName" name="officeFirstName" placeholder="Janet" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.officeFirstName} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="officeLastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input type="text" id="officeLastName" name="officeLastName" placeholder="Smith" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.officeLastName} onChange={handleChange} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="officeLocation" className="block text-sm font-medium text-gray-700 mb-1">Office Location</label>
            <div className="mt-2 grid grid-cols-1">
              <select id="officeLocation" name="officeLocation" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600 sm:text-sm/6" value={value.officeLocation} onChange={handleChange}>
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
            </div>
          <div>
            <label htmlFor="buildingNumber" className="block text-sm font-medium text-gray-700 mb-1">Building Number</label>
            <input type="text" id="buildingNumber" name="buildingNumber" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.buildingNumber} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="workspaceLocation" className="block text-sm font-medium text-gray-700 mb-1">Workspace Location</label>
            <input type="text" id="workspaceLocation" name="workspaceLocation" className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.workspaceLocation} onChange={handleChange} />
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