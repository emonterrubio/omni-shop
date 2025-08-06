import React from 'react';
import Link from 'next/link';
import { Order } from '@/types/orders';
import { OrderStatus } from './OrderStatus';

interface OrderHeaderProps {
  order: Order;
}

export function OrderHeader({ order }: OrderHeaderProps) {
  return (
    <div className="bg-gray-100 px-8 py-6 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-12 text-base">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Order number</span>
              <span className="text-base text-gray-600 font-bold">{order.orderNumber}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Order submitted</span>
              <span className="text-base text-gray-600 font-bold">{order.orderDate}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Ordered by</span>
              <span className="text-base text-gray-900 font-bold">{order.orderedBy}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Ordered for</span>
              <span className="text-base text-gray-900 font-bold">{order.orderedFor}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Total</span>
              <span className="text-base text-gray-900 font-bold">${order.total.toLocaleString()}</span>
            </div>
            {/* <div className="flex flex-col">
              <span className="font-medium text-gray-700">
                Shipping to {order.shippingAddress.type === 'residential' ? 'Residential Address' : 'Office Address'}
              </span>
              <span className="text-base text-gray-900 font-bold">{order.shippingAddress.address}</span>
            </div> */}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/developer-setup/details?orderId=${order.id}`} className="text-base font-regular text-blue-600 hover:text-blue-800">View Order Details</Link>
            <div className="mr-2 ml-2 hidden h-6 w-px bg-gray-400 sm:block"></div>
            <button className="text-base font-regular text-blue-600 hover:text-blue-800">Track Order</button>
          </div>
        {/* <OrderStatus status={order.status} deliveryDate={order.deliveryDate} /> */}
      </div>
    </div>
  );
} 