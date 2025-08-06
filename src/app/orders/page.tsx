"use client";

import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { OrderList } from '@/components/orders/OrderList';

export default function OrdersPage() {
  return (
    <PageLayout>
      <div className="text-left mb-8">
        <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-2">My Orders</h1>
        <p className="text-lg font-regular text-gray-800 mb-4">
          Track your orders and reorder items you've purchased before.
        </p>
      </div>
      
      <OrderList />
    </PageLayout>
  );
} 