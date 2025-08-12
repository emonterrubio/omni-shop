"use client";

import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { OrderList } from '@/components/orders/OrderList';

export default function OrdersPage() {
  return (
    <PageLayout>
      <div className="text-left">
        <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-4">My Orders</h1>
        <h4 className="font-base text-gray-600 mb-8">
          Track your orders and reorder items you've purchased before.
        </h4>
      </div>
      <OrderList />
    </PageLayout>
  );
} 