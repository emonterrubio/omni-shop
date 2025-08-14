import React, { useState, useEffect } from 'react';
import { OrderCard } from './OrderCard';
import { getOrders } from '@/services/orders';
import { Order } from '@/types/orders';

export function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const userOrders = getOrders();
    setOrders(userOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-600 mb-6">Start shopping to see your orders here.</p>
        <a 
          href="/catalog" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
        >
          Browse Catalog
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
} 