import React, { useState } from 'react';
import { BillingDetailsForm } from './BillingDetailsForm';
import { ShippingDetailsForm } from './ShippingDetailsForm';
import { OrderSummary } from '../ui/OrderSummary';
import { CostCenter } from '../ui/CostCenter';
import { useRouter } from "next/navigation";

interface Item {
  model: string;
  brand: string;
  image: string;
  price: number | string;
  quantity: number;
  recommended: boolean;
}

interface CheckoutPageProps {
  items: Item[];
  shippingCost: number;
  costCenter?: string;
  onBack: () => void;
}

export function CheckoutPage({ items, shippingCost, costCenter, onBack }: CheckoutPageProps) {
  const router = useRouter();
  
  // Billing form state
  const [billing, setBilling] = useState({
    name: '',
    lastName: '',
    costCenter: '',
    businessUnit: '',
    department: '',
    info: '',
  });
  
  // Cost center state
  const [costCenterValue, setCostCenterValue] = useState(costCenter || '');
  
  // Shipping form state
  const [shippingType, setShippingType] = useState<'residential' | 'office'>('residential');
  const [shipping, setShipping] = useState({
    // residential
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    country: '',
    city: '',
    zip: '',
    phone: '',
    shippingInfo: '',
    // office
    officeFirstName: '',
    officeLastName: '',
    officeLocation: '',
    buildingNumber: '',
    workspaceLocation: '',
    officeShippingInfo: '',
  });

  // Validation - only fields with asterisks (*) are required
  const isBillingValid = Boolean(billing.name); // Only Manager* is required
  
  let isShippingValid = false;
  if (shippingType === 'residential') {
    isShippingValid = !!(
      shipping.firstName &&      // First Name*
      shipping.lastName &&       // Last Name*
      shipping.address1 &&       // Address*
      shipping.country &&        // Country*
      shipping.city &&           // City/Town*
      shipping.zip &&            // Postcode/ZIP*
      shipping.phone             // Phone*
    );
  } else {
    isShippingValid = !!(
      shipping.officeFirstName &&    // First Name*
      shipping.officeLastName &&     // Last Name*
      shipping.officeLocation &&     // Office Location*
      shipping.buildingNumber &&     // Building Number*
      shipping.workspaceLocation     // Workspace Location*
    );
  }
  const isFormValid = isBillingValid && isShippingValid;

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/,/g, '')) : item.price;
    return sum + (price * item.quantity);
  }, 0);
  const tax = Math.round((subtotal * 0.047) * 100) / 100; // 4.7% tax rate, rounded to 2 decimal places
  const total = Math.round((subtotal + tax + shippingCost) * 100) / 100; // Total rounded to 2 decimal places

  const handlePlaceOrder = () => {
    const orderData = {
      billing,
      shipping,
      shippingType,
      items,
      subtotal,
      shippingCost,
      total,
    };
    localStorage.setItem("devSetupOrder", JSON.stringify(orderData));
    router.push("/developer-setup/confirmation");
  };

  return (
    <div>
      {/* Header */}
      <div className="text-left">
        <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-2">Checkout</h1>
        <h4 className="font-base text-gray-800 mb-8">Review your billing and shipping details and proceed with your request</h4>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Left Column: Billing and Shipping Forms */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Billing Details */}
          <div className="bg-white rounded-lg border border-gray-200 px-4 py-4">
            <BillingDetailsForm value={billing} onChange={setBilling} />
          </div>

          {/* Shipping Details */}
          <div className="bg-white rounded-lg border border-gray-200 px-4 py-4">
            <ShippingDetailsForm 
              value={shipping} 
              onChange={setShipping} 
              shippingType={shippingType} 
              setShippingType={setShippingType} 
            />
          </div>
        </div>

        {/* Right Column: Cost Center and Order Summary */}
        <div className="flex flex-col gap-2">
          <CostCenter 
            value={costCenterValue}
            onChange={setCostCenterValue}
          />
          <OrderSummary
            subtotal={subtotal}
            tax={tax}
            shippingCost={shippingCost}
            costCenter={costCenterValue}
            total={total}
            onCheckout={handlePlaceOrder}
            checkoutButtonText="Submit"
            showCheckoutButton={true}
            disabled={!isFormValid}
            itemCount={items.length}
            showContinueShopping={true}
            onContinueShopping={() => router.push('/catalog')}
            requestedFor="John Doe"
          />
        </div>
      </div>
    </div>
  );
} 