"use client";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { MainNavigation } from '../../components/layout/MainNavigation';
import { StepProgressBar } from '../../components/ui/StepProgressBar';
import { AIRecommendationCard } from '../../components/ui/AIRecommendationCard';
import { hardwareData } from '../../data/hardwareData';
import { monitorData } from '../../data/monitorData';
import { keyboardData } from '../../data/keyboardData';
import { mouseData } from '../../data/mouseData';
import { useState, useEffect, useContext } from 'react';
import { SelectionOptionCard } from '../../components/ui/SelectionOptionCard';
import React from 'react';
import Image from 'next/image';
import { Stepper } from '../../components/ui/Stepper';
import { SelectionStep } from '../../components/developer-setup/SelectionStep';
import { ShoppingCart } from '../../components/developer-setup/ShoppingCart';
import { CheckoutPage } from '../../components/developer-setup/CheckoutPage';
import { CartContext } from '../../components/CartContext';

export function DeveloperSetupClient() {
  const [step, setStep] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedLaptop, setSelectedLaptop] = useState<string | null>(null);
  const [selectedMonitor, setSelectedMonitor] = useState<string | null>(null);
  const [selectedKeyboard, setSelectedKeyboard] = useState<string | null>(null);
  const [selectedMouse, setSelectedMouse] = useState<string | null>(null);
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    description: '',
  });
  const [costCenter, setCostCenter] = useState<string | undefined>(undefined);
  const { cartItems, clearCart } = useContext(CartContext);

  // Filter laptops from hardwareData and limit to 3
  const laptops = hardwareData
    .filter(item => item.category === 'Laptops')
    .slice(0, 3)
    .map((item, idx) => ({ ...item, recommended: idx === 0 }));

  // Filter and limit monitors to 3 recommended
  const monitors = monitorData
    .filter(m => m.recommended)
    .slice(0, 3)
    .map((item, idx) => ({ ...item, recommended: idx === 0 }));

  // Filter and limit keyboards and mice to 3 recommended
  const keyboards = keyboardData
    .filter(k => k.recommended)
    .slice(0, 3)
    .map((item, idx) => ({ ...item, recommended: idx === 0 }));
  const mice = mouseData
    .filter(m => m.recommended)
    .slice(0, 3)
    .map((item, idx) => ({ ...item, recommended: idx === 0 }));

  // AI recommendations for each step
  const aiRecommendations = [
    'Based on your role as a Senior Developer, I recommend starting with a high-performance laptop for productivity and development tasks.',
    'For your workflow, a high-quality monitor is essential. Most developers benefit from 27" 4K displays or ultrawide monitors.',
    'A comfortable, ergonomic keyboard can make a big difference in your daily work. Choose one that fits your typing style.',
    'A precise and ergonomic mouse will help you work efficiently and comfortably throughout the day.',
    'Please provide your shipping details to proceed.',
    'Review your selections and confirm your setup.'
  ];

  const setupSteps = [
    "Choose your laptop",
    "Choose your monitor",
    "Choose your keyboard",
    "Choose your mouse"
  ];

  console.log('selectedLaptop:', selectedLaptop);
  console.log('hardwareData models:', hardwareData.map(i => i.model));
  console.log(
    'matchedLaptop:',
    hardwareData.find(i => i.model.trim().toLowerCase() === selectedLaptop?.trim().toLowerCase())
  );

  const selectedItems = [
    laptops.find(i => i.model === selectedLaptop),
    monitors.find(i => i.model === selectedMonitor),
    keyboards.find(i => i.model === selectedKeyboard),
    mice.find(i => i.model === selectedMouse),
  ].filter((item): item is typeof laptops[number] => !!item);

  const handleEdit = () => {
    setShowSummary(false);
    setStep(1);
  };
  
  const handleCheckout = (costCenterValue?: string) => {
    setCostCenter(costCenterValue);
    setShowSummary(false);
    setShowCheckout(true);
    clearCart();
  }

  const handleBackFromCheckout = () => {
    setShowCheckout(false);
    setShowSummary(true);
    clearCart();
  };

  // Calculate totals for checkout
  const subtotal = selectedItems.reduce((sum, item) => {
    const price = typeof item.price === 'string' ? parseFloat(String(item.price).replace(/,/g, '')) : item.price;
    return sum + price;
  }, 0);
  // This would come from state in a real app
  const shippingCost = 14; 
  const total = subtotal + shippingCost;

  if (showCheckout) {
    // We need to map selectedItems to the format CheckoutCart expects
    const checkoutItems = selectedItems.map(item => ({ ...item, quantity: 1 }));
    return (
      <div className="flex flex-col h-screen bg-gray-50 mb-12">
        <Header />
        <MainNavigation />
        <main>
          <CheckoutPage 
            items={checkoutItems} 
            shippingCost={shippingCost}
            costCenter={costCenter}
            onBack={handleBackFromCheckout}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 mb-12">
      <Header />
      <MainNavigation />
      <main className="w-full mx-auto flex-1 overflow-y-auto px-6 md:px-10 py-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-4"
          aria-label="Go back"
          onClick={e => {
            if (showSummary) {
              e.preventDefault();
              setShowSummary(false);
              setStep(4);
            }
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
        {showSummary ? null : showCheckout ? null : (
          <div className="text-center">
            <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-4">Developer Setup</h1>
            <h4 className="max-w-2xl mx-auto font-base text-center text-gray-600 mb-8">Step by step guide to build your ideal developer setup</h4>
          </div>
        )}
        {!showSummary && !showCheckout && <Stepper currentStep={step} steps={setupSteps} />}
        <div className="mt-8">
          {!showSummary && (
            <AIRecommendationCard>
              {aiRecommendations[step - 1]}
            </AIRecommendationCard>
          )}
        </div>
        {!showSummary && step === 1 && (
          <SelectionStep
            title="Choose Your Laptop"
            items={laptops}
            selectedItem={selectedLaptop}
            onSelectItem={setSelectedLaptop}
            radioName="laptop-selection"
          />
        )}
        {!showSummary && step === 2 && (
          <SelectionStep
            title="Choose Your Monitor"
            items={monitors}
            selectedItem={selectedMonitor}
            onSelectItem={setSelectedMonitor}
            radioName="monitor-selection"
          />
        )}
        {!showSummary && step === 3 && (
          <SelectionStep
            title="Choose Your Keyboard"
            items={keyboards}
            selectedItem={selectedKeyboard}
            onSelectItem={setSelectedKeyboard}
            radioName="keyboard-selection"
          />
        )}
        {!showSummary && step === 4 && (
          <SelectionStep
            title="Choose Your Mouse"
            items={mice}
            selectedItem={selectedMouse}
            onSelectItem={setSelectedMouse}
            radioName="mouse-selection"
          />
        )}
        {showSummary && (
          <ShoppingCart selectedItems={selectedItems} onEdit={handleEdit} onCheckout={handleCheckout} />
        )}
        {!showSummary && (
          <div className="flex justify-between mt-6">
            <button
              className="flex items-center justify-center px-4 py-1 text-gray-600 hover:text-gray-800 transition-colors w-auto cursor-pointer"
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
            >
              Previous
            </button>
            <button
              className={`flex items-center justify-center px-4 py-1 rounded-md transition-colors w-auto cursor-pointer ${
                (step === 1 && !selectedLaptop) ||
                (step === 2 && !selectedMonitor) ||
                (step === 3 && !selectedKeyboard) ||
                (step === 4 && !selectedMouse) ||
                (step === 5 && !shippingForm.firstName && !shippingForm.lastName && !shippingForm.address)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-800'
              }`}
              onClick={() => {
                if (step < 4) setStep(step + 1);
                else if (step === 4) setShowSummary(true);
              }}
              disabled={
                (step === 1 && !selectedLaptop) ||
                (step === 2 && !selectedMonitor) ||
                (step === 3 && !selectedKeyboard) ||
                (step === 4 && !selectedMouse)
              }
            >
              {step === 4 ? 'View Summary' : 'Next'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
} 