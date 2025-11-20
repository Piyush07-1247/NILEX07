export interface Product {
  id: string;
  name: string;
  price: number;
  mrp: number; // Maximum Retail Price for discount calc
  description: string;
  image: string;
  category: string;
  sizes: string[]; // S, M, L, XL
  rating: number;
  reviews: number;
  assured: boolean; // P-Assured tag
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Delivered';
  timestamp: string;
  paymentMethod: 'UPI';
  transactionId?: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  orders?: Order[];
  products?: Product[];
}