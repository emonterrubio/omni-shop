import React, { useState, useContext, useMemo } from 'react';
import { BillingDetailsForm } from './BillingDetailsForm';
import { ShippingDetailsForm } from './ShippingDetailsForm';
import { OrderSummary } from '../ui/OrderSummary';
import { CostCenter } from '../ui/CostCenter';
import { useRouter } from "next/navigation";
import { createOrderFromCheckout, saveOrder } from '@/services/orders';
import { CartContext } from '../CartContext';

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
  const { clearCart } = useContext(CartContext);
  
  // Generate random data for pre-population
  const generateRandomData = () => {
    const requestedByNames = [
      "Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Thompson", 
      "Lisa Wang", "James Wilson", "Maria Garcia", "Robert Brown",
      "Jennifer Davis", "Christopher Lee", "Amanda Taylor", "Daniel Martinez"
    ];
    const onBehalfOfNames = [
      "Alex Thompson", "Jessica Kim", "Ryan O'Connor", "Nicole Patel",
      "Kevin Anderson", "Rachel Green", "Tyler Johnson", "Samantha White",
      "Brandon Davis", "Megan Clark", "Jordan Smith", "Ashley Rodriguez"
    ];
    
    const fpaApproverNames = [
      "Michael Chen", "Sarah Johnson", "David Thompson", "Emily Rodriguez",
      "James Wilson", "Lisa Wang", "Robert Brown", "Maria Garcia",
      "Christopher Lee", "Jennifer Davis", "Amanda Taylor", "Daniel Martinez"
    ];
    
    const businessOwnerNames = [
      "John Smith", "Emma Wilson", "Michael Brown", "Sarah Davis",
      "David Miller", "Lisa Garcia", "Robert Rodriguez", "Jennifer Martinez",
      "Christopher Anderson", "Amanda Taylor", "Daniel Thomas", "Ashley Jackson"
    ];
    
    const shippingFirstNameNames = [
      "Alex", "Jordan", "Taylor", "Casey", "Morgan", "Riley",
      "Avery", "Quinn", "Sage", "Blake", "Cameron", "Drew"
    ];
    
    const shippingLastNameNames = [
      "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
      "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez"
    ];
    
    const officeLocations = [
      "Austin", "Kirkland", "Los Angeles - Chatsworth", "Los Angeles - Del Rey", 
      "Orlando", "Redwood Shores"
    ];
    
    const addresses = [
      "123 Main Street", "456 Oak Avenue", "789 Pine Road", "321 Elm Street",
      "654 Maple Drive", "987 Cedar Lane", "147 Birch Boulevard", "258 Spruce Way"
    ];
    
    const cities = [
      "Austin", "Kirkland", "Los Angeles", "Orlando", "Redwood City", "Seattle",
      "Vancouver", "Montreal", "Toronto", "Chicago", "New York", "Boston"
    ];
    
    const countries = ["United States", "Canada", "United Kingdom"];
    
    const zipCodes = ["78701", "98033", "90210", "32801", "94065", "98101", "V6B 1A1", "H3A 0G4"];
    
    const phoneNumbers = [
      "(512) 555-0123", "(425) 555-0456", "(323) 555-0789", "(407) 555-0321",
      "(650) 555-0654", "(206) 555-0987", "(604) 555-0147", "(514) 555-0258"
    ];
    
    // North American Business Units (from EA organizational chart)
    const businessUnits = [
      "4589 - EA Inc.", "1234 - EA Redwood Shores", "5678 - EA Montreal",
      "9012 - EA Austin", "3456 - EA Vancouver", "7890 - EA Seattle",
      "2468 - EA Los Angeles", "1357 - EA Orlando", "9753 - EA Toronto",
      "8642 - EA Chicago", "1593 - EA New York", "7410 - EA Boston",
      "1358 - Tiburon Entertainment", "2469 - Pandemic Studios LLC",
      "3570 - Criterion Software Inc", "4681 - Bioware ULC",
      "5792 - PopCap Games Inc", "6803 - Chillingo LLC",
      "7914 - Glu Mobile Inc.", "8025 - KlickNation Corporation",
      "9136 - Playfish Inc.", "0247 - Maxis", "1358 - Westwood Studios",
      "2469 - DICE Canada", "3570 - EA Black Box", "4681 - EA Productions Canada"
    ];
    
    // Department codes with 4 digits and unit names
    const departments = [
      "5162 - Battlefield & Respawn Analytics", "1234 - FIFA Development",
      "5678 - Apex Legends Studio", "9012 - The Sims Production",
      "3456 - EA Sports Technology", "7890 - Mobile Gaming Division",
      "2468 - Quality Assurance", "1357 - User Experience Design",
      "9753 - Data Science & Analytics", "8642 - Platform Engineering",
      "1593 - Marketing & Communications", "7410 - Business Development"
    ];
    
    return {
      requestedBy: requestedByNames[Math.floor(Math.random() * requestedByNames.length)],
      onBehalfOf: onBehalfOfNames[Math.floor(Math.random() * onBehalfOfNames.length)],
      businessUnit: businessUnits[Math.floor(Math.random() * businessUnits.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      projectCode: "000000",
      fpaApprover: fpaApproverNames[Math.floor(Math.random() * fpaApproverNames.length)],
      businessOwner: businessOwnerNames[Math.floor(Math.random() * businessOwnerNames.length)],
      shippingFirstName: shippingFirstNameNames[Math.floor(Math.random() * shippingFirstNameNames.length)],
      shippingLastName: shippingLastNameNames[Math.floor(Math.random() * shippingLastNameNames.length)],
      address1: addresses[Math.floor(Math.random() * addresses.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      zip: zipCodes[Math.floor(Math.random() * zipCodes.length)],
      phone: phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)],
      officeFirstName: shippingFirstNameNames[Math.floor(Math.random() * shippingFirstNameNames.length)],
      officeLastName: shippingLastNameNames[Math.floor(Math.random() * shippingLastNameNames.length)],
      officeLocation: officeLocations[Math.floor(Math.random() * officeLocations.length)]
    };
  };

  const randomData = useMemo(() => generateRandomData(), []);
  
  // Billing form state
  const [billing, setBilling] = useState({
    requestedBy: randomData.requestedBy,
    onBehalfOf: randomData.onBehalfOf,
    businessUnit: randomData.businessUnit,
    department: randomData.department,
    projectCode: randomData.projectCode,
    fpaApprover: randomData.fpaApprover,
    businessOwner: randomData.businessOwner,
    businessJustification: '',
  });
  
  // Cost center state
  const [costCenterValue, setCostCenterValue] = useState(costCenter || '');
  
  // Shipping form state
  const [shippingType, setShippingType] = useState<'residential' | 'office'>('office');
  const [shipping, setShipping] = useState({
    // residential
    firstName: randomData.shippingFirstName,
    lastName: randomData.shippingLastName,
    address1: randomData.address1,
    address2: '',
    country: randomData.country,
    city: randomData.city,
    zip: randomData.zip,
    phone: randomData.phone,
    shippingInfo: '',
    // office
    officeFirstName: randomData.officeFirstName,
    officeLastName: randomData.officeLastName,
    officeLocation: randomData.officeLocation,
    officeShippingInfo: '',
  });

  // Validation - only fields with asterisks (*) are required
  const isBillingValid = Boolean(
    billing.requestedBy && 
    billing.onBehalfOf && 
    billing.businessUnit && 
    billing.department && 
    billing.projectCode && 
    billing.fpaApprover && 
    billing.businessOwner
  );
  
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
      shipping.officeLocation        // Office Location*
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
    // Create and save the order
    const order = createOrderFromCheckout(
      billing,
      shipping,
      shippingType,
      items,
      subtotal,
      shippingCost,
      total
    );
    
    console.log('Created order:', order);
    saveOrder(order);
    
    // Verify the order was saved
    const savedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    console.log('Saved orders after creation:', savedOrders);

    // Also save for confirmation page (existing functionality)
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
    
    // Clear the cart after successful order placement (safety measure)
    clearCart();
    
    // Pass the order ID as a query parameter to ensure we can find the order
    router.push(`/orders/details?orderId=${order.id}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="text-left">
        <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-2">Checkout</h1>
        <h4 className="font-base text-gray-800 mb-8">Review your billing and shipping details and proceed with your request</h4>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {/* Left Column: Billing and Shipping Forms */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Billing Details */}
          <div className="sm:bg-white sm:rounded-lg sm:border sm:border-gray-200 sm:px-4 sm:py-4">
            <BillingDetailsForm value={billing} onChange={setBilling} />
          </div>

          {/* Shipping Details */}
          <div className="sm:bg-white sm:rounded-lg sm:border sm:border-gray-200 sm:px-4 sm:py-4">
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
          {/* <CostCenter 
            value={costCenterValue}
            onChange={setCostCenterValue}
          /> */}
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
          />
        </div>
      </div>
    </div>
  );
} 