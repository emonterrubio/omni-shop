import React from "react";
import { CheckCircle, Clock } from "lucide-react";
import { RecentOrder } from "@/types";

interface RecentOrdersProps {
  orders: RecentOrder[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Your Recent Orders</h2>
      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
        {orders.map((order) => (
          <div key={order.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{order.item}</h3>
                <p className="text-sm text-gray-600">Order #{order.id}</p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">{order.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 