import { Order, OrderItem } from '@/types/orders';

const ORDERS_STORAGE_KEY = 'userOrders';

export function generateOrderNumber(): string {
  return `112-${Math.floor(1000000 + Math.random() * 9000000)}`;
}

export function createOrderFromCheckout(
  billing: any,
  shipping: any,
  shippingType: 'residential' | 'office',
  items: any[],
  subtotal: number,
  shippingCost: number,
  total: number
): Order {
  const orderNumber = generateOrderNumber();
  const orderDate = new Date().toLocaleDateString("en-US", { 
    day: "2-digit", 
    month: "long", 
    year: "numeric" 
  });

  // Convert checkout items to OrderItem format
  const orderItems: OrderItem[] = items.map(item => ({
    model: item.model,
    brand: item.brand,
    image: item.image,
    description: item.card_description || item.description || '',
    price: typeof item.price === 'string' ? parseFloat(item.price.replace(/,/g, '')) : item.price,
    quantity: item.quantity
  }));

  // Create shipping address string
  let shippingAddress = '';
  if (shippingType === 'residential') {
    shippingAddress = `${shipping.address1}, ${shipping.city}, ${shipping.country} ${shipping.zip}`;
  } else {
    shippingAddress = `${shipping.officeLocation}`;
  }

  // Determine who ordered vs who is receiving
  const orderedBy = `${billing.requestedBy}`;
  const orderedFor = shippingType === 'residential' 
    ? `${shipping.firstName} ${shipping.lastName}`
    : `${shipping.officeFirstName} ${shipping.officeLastName}`;

  const order: Order = {
    id: Date.now().toString(),
    orderNumber,
    orderDate,
    orderedBy,
    orderedFor,
    shippingAddress: {
      type: shippingType,
      address: shippingAddress
    },
    status: 'pending',
    items: orderItems,
    total
  };

  return order;
}

export function saveOrder(order: Order): void {
  const existingOrders = getOrders();
  const updatedOrders = [order, ...existingOrders]; // Add new order to the beginning
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
}

export function getOrders(): Order[] {
  const ordersData = localStorage.getItem(ORDERS_STORAGE_KEY);
  return ordersData ? JSON.parse(ordersData) : [];
}

export function clearOrders(): void {
  localStorage.removeItem(ORDERS_STORAGE_KEY);
}

// Clear orders for testing purposes
export function clearOrdersForTesting(): void {
  localStorage.removeItem(ORDERS_STORAGE_KEY);
  console.log('Orders cleared for testing');
}

export function updateOrderStatus(orderId: string, status: 'pending' | 'delivered' | 'in-transit', deliveryDate?: string): void {
  const orders = getOrders();
  const updatedOrders = orders.map(order => {
    if (order.id === orderId) {
      return { ...order, status, deliveryDate };
    }
    return order;
  });
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
} 