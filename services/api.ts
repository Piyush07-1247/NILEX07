import { APPS_SCRIPT_URL } from '../constants';
import { Order } from '../types';

// --- MOCK SERVICE FOR DEMO/FALLBACK ---
const getMockOrders = (): Order[] => {
  const saved = localStorage.getItem('mock_orders');
  return saved ? JSON.parse(saved) : [];
};

const saveMockOrder = (order: Omit<Order, 'id' | 'status' | 'timestamp'>) => {
  const orders = getMockOrders();
  const newOrder: Order = {
    ...order,
    id: 'OD' + Date.now().toString().slice(-6),
    status: 'Pending',
    timestamp: new Date().toISOString(),
    transactionId: 'TXN' + Math.floor(Math.random() * 100000)
  };
  orders.push(newOrder);
  localStorage.setItem('mock_orders', JSON.stringify(orders));
  return newOrder.id;
};

const updateMockStatus = (orderId: string, status: string) => {
  const orders = getMockOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    // Validate status type
    if (['Pending', 'Paid', 'Shipped', 'Delivered'].includes(status)) {
        orders[index].status = status as any;
        localStorage.setItem('mock_orders', JSON.stringify(orders));
        return true;
    }
  }
  return false;
};

// --- API CALLS WITH FAILSAFE ---

export const submitOrder = async (order: Omit<Order, 'id' | 'status' | 'timestamp'>): Promise<{ success: boolean, orderId?: string }> => {
  try {
    if (APPS_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) throw new Error("Using Mock");

    const payload = { action: 'createOrder', data: order };
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    // Check if response is HTML (error page) instead of JSON
    if (text.trim().startsWith('<')) throw new Error("Received HTML instead of JSON");
    
    const result = JSON.parse(text);
    return result;
  } catch (error) {
    console.warn("API unavailable, using local Mock storage.", error);
    // Fallback to LocalStorage
    const orderId = saveMockOrder(order);
    return { success: true, orderId };
  }
};

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    if (APPS_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) throw new Error("Using Mock");

    const response = await fetch(`${APPS_SCRIPT_URL}?action=getOrders`);
    const text = await response.text();
    
    if (text.trim().startsWith('<')) throw new Error("Received HTML instead of JSON");

    const result = JSON.parse(text);
    return result.orders || [];
  } catch (error) {
    console.warn("API unavailable, fetching from local Mock storage.");
    return getMockOrders();
  }
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<boolean> => {
  try {
    if (APPS_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) throw new Error("Using Mock");

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'updateStatus', orderId, status }),
    });
    
    const text = await response.text();
    if (text.trim().startsWith('<')) throw new Error("Received HTML instead of JSON");

    const result = JSON.parse(text);
    return result.success;
  } catch (error) {
    console.warn("API unavailable, updating local Mock storage.");
    return updateMockStatus(orderId, status);
  }
};