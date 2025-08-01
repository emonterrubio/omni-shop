import React, { useState } from 'react';
import { BillingDetailsForm } from './BillingDetailsForm';
import { ShippingDetailsForm } from './ShippingDetailsForm';
import { CheckoutCart } from './CheckoutCart';
import { ArrowLeft } from 'lucide-react';
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
    building: '',
    info: '',
  });
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

  // Validation
  const isBillingValid = Boolean(billing.name && billing.lastName);
  let isShippingValid = false;
  if (shippingType === 'residential') {
    isShippingValid = !!(
      shipping.firstName &&
      shipping.lastName &&
      shipping.address1 &&
      shipping.country &&
      shipping.city &&
      shipping.zip &&
      shipping.phone
    );
  } else {
    isShippingValid = !!(
      shipping.officeFirstName &&
      shipping.officeLastName &&
      shipping.officeLocation &&
      shipping.buildingNumber &&
      shipping.workspaceLocation
    );
  }
  const isFormValid = isBillingValid && isShippingValid;

  // Debug log
  console.log({ billing, shipping, isBillingValid, isShippingValid, isFormValid });

  const subtotal = items.reduce((sum, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/,/g, '')) : item.price;
    return sum + (price * item.quantity);
  }, 0);
  const total = subtotal + shippingCost;

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="px-6">
        <div className="text-left">
        <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-4">Checkout</h1>
        <h4 className="font-base text-gray-600 mb-8">Fill out your billing and shipping details below and place your order</h4>
      </div>
      </div>  
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left column: Forms */}
        <div className="lg:col-span-7">
          <div className="flex flex-col gap-4">
            <BillingDetailsForm value={billing} onChange={setBilling} />
            <ShippingDetailsForm value={shipping} onChange={setShipping} shippingType={shippingType} setShippingType={setShippingType} />
          </div>
        </div>

        {/* Right column: Cart */}
        <div className="lg:col-span-5">
          <CheckoutCart 
            items={items}
            shippingCost={shippingCost}
            costCenter={costCenter}
            disabled={!isFormValid}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  );
} 