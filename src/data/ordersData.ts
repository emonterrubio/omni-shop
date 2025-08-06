import { Order } from '@/types/orders';

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '112-5907835',
    orderDate: 'July 14, 2025',
    orderedBy: 'John Manager',
    orderedFor: 'Janet Smith',
    shippingAddress: {
      type: 'residential',
      address: '123 Davis Avenue, New York, USA 27077'
    },
    status: 'delivered',
    deliveryDate: 'July 16, 2025',
    total: 2598,
    items: [
      {
        model: 'MacBook Pro 16"',
        brand: 'Apple',
        image: '/images/macbook_pro_16.png',
        description: '16-inch MacBook Pro with M3 Pro chip',
        price: 2499,
        quantity: 1
      },
      {
        model: 'Magic Keyboard',
        brand: 'Apple',
        image: '/images/apple_magic_keyboard.png',
        description: 'Wireless keyboard with numeric keypad',
        price: 99,
        quantity: 1
      }
    ]
  },
  {
    id: '2',
    orderNumber: '112-5907836',
    orderDate: 'July 10, 2025',
    orderedBy: 'Sarah Manager',
    orderedFor: 'John Doe',
    shippingAddress: {
      type: 'office',
      address: 'Austin, Building 123, Desk A'
    },
    status: 'in-transit',
    total: 1299,
    items: [
      {
        model: 'Dell XPS 13 Plus',
        brand: 'Dell',
        image: '/images/dell_xps_13_plus.png',
        description: '13.4-inch Ultrabook with Intel Core i7',
        price: 1299,
        quantity: 1
      }
    ]
  },
  {
    id: '3',
    orderNumber: '112-5907837',
    orderDate: 'July 5, 2025',
    orderedBy: 'Mike Manager',
    orderedFor: 'Sarah Johnson',
    shippingAddress: {
      type: 'residential',
      address: '1234 Main Street, Los Angeles, CA 90012'
    },
    status: 'pending',
    total: 478,
    items: [
      {
        model: 'Sony WH-1000XM5',
        brand: 'Sony',
        image: '/images/sony_wh-1000xm5_headphones.png',
        description: 'Wireless noise-canceling headphones',
        price: 399,
        quantity: 1
      },
      {
        model: 'Logitech MX Master 2S',
        brand: 'Logitech',
        image: '/images/logitech_mx_master_2s_mouse.png',
        description: 'Wireless ergonomic mouse',
        price: 79,
        quantity: 1
      }
    ]
  }
]; 