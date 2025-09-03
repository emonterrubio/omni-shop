import React, { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
// import { Tooltip } from '../ui/Tooltip';
interface BillingDetailsFormProps {
  value: {
    requestedBy: string;
    onBehalfOf: string;
    businessUnit: string;
    department: string;
    projectCode: string;
    fpaApprover: string;
    businessOwner: string;
    businessJustification: string;
  };
  onChange: (val: any) => void;
  /**
   * Form for entering billing details.
   *
   * The form includes fields for:
   * - Manager
   * - Cost Center
   * - Business Unit
   * - Department
   * - Additional Information
   *
   * The form will be validated on blur and change events.
   * If a field is required, but left blank, an error message will be displayed.
   * If a field is not required, but has an error message, the error message will be displayed.
   *
   * The `onChange` function will be called with the value of the form.
   * The form will be validated and any errors will be passed in the `errors` property of the form value.
   */
}

export function BillingDetailsForm({ value, onChange }: BillingDetailsFormProps) {
  const [touched, setTouched] = useState<any>({});
  const [errors, setErrors] = useState<any>({});



  const requiredFields = ['requestedBy', 'onBehalfOf', 'businessUnit', 'department', 'projectCode', 'fpaApprover', 'businessOwner'];

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
          <label htmlFor="requestedBy" className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-1">
              Requested by<span className="text-red-500">*</span>
              <div title="This field is automatically populated and cannot be edited.">
                <InformationCircleIcon className="w-4 h-4 text-gray-400 cursor-help" />
              </div>
            </div>
          </label>
          <input 
            type="text" 
            id="requestedBy" 
            name="requestedBy" 
            className="block w-full rounded-sm bg-gray-50 px-3 py-2 text-base text-gray-600 border border-gray-300 cursor-not-allowed sm:text-sm/6" 
            value={value.requestedBy} 
            readOnly 
            disabled
          />
        </div>
        <div>
          <label htmlFor="onBehalfOf" className="block text-sm font-medium text-gray-700 mb-1">
            On behalf of<span className="text-red-500">*</span>
          </label>
          <input type="text" id="onBehalfOf" name="onBehalfOf" placeholder="Enter name" className="block w-full rounded-sm bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.onBehalfOf} onChange={handleChange} onBlur={handleBlur} />
          {touched.onBehalfOf && errors.onBehalfOf && <p className="text-red-500 text-xs mt-1">{errors.onBehalfOf}</p>}
        </div>
        <div>
          <label htmlFor="businessUnit" className="block text-sm font-medium text-gray-700 mb-1">Business Unit<span className="text-red-500">*</span></label>
          <input type="text" id="businessUnit" name="businessUnit" placeholder="Enter business unit" className="block w-full rounded-sm bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.businessUnit} onChange={handleChange} onBlur={handleBlur} />
          {touched.businessUnit && errors.businessUnit && <p className="text-red-500 text-xs mt-1">{errors.businessUnit}</p>}
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department<span className="text-red-500">*</span></label>
          <input type="text" id="department" name="department" placeholder="Enter department" className="block w-full rounded-sm bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.department} onChange={handleChange} onBlur={handleBlur} />
          {touched.department && errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
        </div>
        <div>
          <label htmlFor="projectCode" className="block text-sm font-medium text-gray-700 mb-1">Project Code<span className="text-red-500">*</span></label>
          <input type="text" id="projectCode" name="projectCode" placeholder="Enter project code" className="block w-full rounded-sm bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.projectCode} onChange={handleChange} onBlur={handleBlur} />
          {touched.projectCode && errors.projectCode && <p className="text-red-500 text-xs mt-1">{errors.projectCode}</p>}
        </div>
        <div>
          <label htmlFor="fpaApprover" className="block text-sm font-medium text-gray-700 mb-1">
            FP&A Approver<span className="text-red-500">*</span>
          </label>
          <input type="text" id="fpaApprover" name="fpaApprover" placeholder="Enter FP&A approver name" className="block w-full rounded-sm bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.fpaApprover} onChange={handleChange} onBlur={handleBlur} />
          {touched.fpaApprover && errors.fpaApprover && <p className="text-red-500 text-xs mt-1">{errors.fpaApprover}</p>}
        </div>
        <div>
          <label htmlFor="businessOwner" className="block text-sm font-medium text-gray-700 mb-1">Business Owner<span className="text-red-500">*</span></label>
          <input type="text" id="businessOwner" name="businessOwner" placeholder="Enter business owner name" className="block w-full rounded-sm bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.businessOwner} onChange={handleChange} onBlur={handleBlur} />
          {touched.businessOwner && errors.businessOwner && <p className="text-red-500 text-xs mt-1">{errors.businessOwner}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="businessJustification" className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-1">
              Business Justification
              <div title="Justification for the equipment requested is highly recommended as it will inform the approval decision from Finance and Budget Owner.">
                <InformationCircleIcon className="w-4 h-4 text-gray-400 cursor-help" />
              </div>
            </div>
          </label>
          <textarea id="businessJustification" name="businessJustification" placeholder="Type your notes here." rows={4} className="block w-full rounded-sm bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-blue-600 sm:text-sm/6" value={value.businessJustification} onChange={handleChange}></textarea>
        </div>
      </div>
    </div>
  );
} 