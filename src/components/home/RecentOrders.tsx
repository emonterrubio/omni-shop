"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Clock, Truck } from "lucide-react";
import { getOrders } from "@/services/orders";
import { Order } from "@/types/orders";

interface RecentOrdersProps {
  maxOrders?: number;
}

export function RecentOrders({ maxOrders = 2 }: RecentOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const userOrders = getOrders();
    // Sort by order date (newest first) and take the most recent orders
    const sortedOrders = userOrders
      .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
      .slice(0, maxOrders);
    setOrders(sortedOrders);
  }, [maxOrders]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-transit':
        return <Truck className="w-4 h-4 text-blue-600" />;
      case 'pending':
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return "bg-green-100 text-green-800";
      case 'in-transit':
        return "bg-blue-100 text-blue-800";
      case 'pending':
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return "Delivered";
      case 'in-transit':
        return "In Transit";
      case 'pending':
      default:
        return "Processing";
    }
  };

  if (orders.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Recent Orders</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No orders yet. Start shopping to see your recent orders here.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-regular text-gray-900">Your Recent Orders</h2>
        <Link
          href="/orders"
          className="text-blue-600 hover:text-blue-800 font-medium py-2 transition-colors"
        >
          See all
        </Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
        {orders.map((order) => {
          const firstItem = order.items[0];
          return (
            <div key={order.id} className="p-4">
              <div className="flex items-start items-center space-x-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={firstItem.image}
                    alt={firstItem.model}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                </div>
                
                                  {/* Order Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-regular leading-tight text-gray-900 truncate">{firstItem.model}</h3>
                    <Link 
                      href={`/developer-setup/details?orderId=${order.id}`}
                      className="text-base text-blue-600 hover:text-blue-800 font-regular transition-colors"
                    >
                      #{order.orderNumber}
                    </Link>
                  </div>
                
                {/* Status and Date */}
                <div className="flex-shrink-0 text-right">
                  <div className="flex items-center justify-end space-x-1 mb-1">
                    {/* {getStatusIcon(order.status)} */}
                    <span
                      className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800">{order.orderDate}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
} 