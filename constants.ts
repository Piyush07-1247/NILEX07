import { Product } from './types';

// If URL is placeholder, API service will automatically use LocalStorage (Mock Mode)
// INSTRUCTION: Replace this with your actual Google Apps Script Web App URL
export const APPS_SCRIPT_URL = 'YOUR_SCRIPT_ID_HERE'; 

export const PLUS_MEMBERSHIP_PRODUCT: Product = {
  id: 'plus_membership',
  name: 'Nilex Plus Membership (1 Year)',
  price: 499,
  mrp: 999,
  description: 'Get free delivery, early access to sales, and exclusive rewards with Nilex Plus.',
  image: 'https://cdn-icons-png.flaticon.com/512/6941/6941697.png',
  category: 'Membership',
  sizes: ['Standard'],
  rating: 5.0,
  reviews: 15000,
  assured: true
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Men Slim Fit Solid Spread Collar Formal Shirt',
    price: 449,
    mrp: 1999,
    description: 'White formal shirt, 100% Cotton, perfect for office wear. Features a spread collar and a patch pocket.',
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3fe5d3d?q=80&w=1000&auto=format&fit=crop',
    category: 'Formal',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.2,
    reviews: 2450,
    assured: true
  },
  {
    id: '2',
    name: 'Men Regular Fit Checkered Casual Shirt',
    price: 399,
    mrp: 1499,
    description: 'Red and Black checkered casual shirt. Breathable fabric, ideal for summer outings.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
    category: 'Casual',
    sizes: ['M', 'L', 'XL'],
    rating: 3.9,
    reviews: 850,
    assured: false
  },
  {
    id: '3',
    name: 'Men Slim Fit Striped Party Shirt',
    price: 899,
    mrp: 2499,
    description: 'Premium party wear shirt with vertical stripes. Satin finish for that extra shine.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
    category: 'Party',
    sizes: ['S', 'M', 'L'],
    rating: 4.5,
    reviews: 120,
    assured: true
  },
  {
    id: '4',
    name: 'Men Printed Floral Beach Shirt',
    price: 599,
    mrp: 1299,
    description: 'Relaxed fit floral printed shirt. Rayon material, super soft and airy.',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
    category: 'Summer',
    sizes: ['M', 'L', 'XL', 'XXL'],
    rating: 4.1,
    reviews: 3400,
    assured: true
  },
  {
    id: '5',
    name: 'Classic Denim Shirt',
    price: 999,
    mrp: 2999,
    description: 'Rugged denim shirt with double pockets. Stone washed for a vintage look.',
    image: 'https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?q=80&w=1000&auto=format&fit=crop',
    category: 'Denim',
    sizes: ['L', 'XL'],
    rating: 4.3,
    reviews: 560,
    assured: false
  },
  {
    id: '6',
    name: 'Black Solid Mandarin Collar Shirt',
    price: 649,
    mrp: 1599,
    description: 'Trendy mandarin collar shirt in jet black. Suitable for both casual and semi-formal events.',
    image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=1000&auto=format&fit=crop',
    category: 'Party',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviews: 4100,
    assured: true
  },
  {
    id: '7',
    name: 'Linen Blend Beige Shirt',
    price: 1299,
    mrp: 3499,
    description: 'Premium Linen blend shirt. Keeps you cool in summer. Earthy beige tone.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000&auto=format&fit=crop',
    category: 'Formal',
    sizes: ['M', 'L', 'XL'],
    rating: 4.7,
    reviews: 110,
    assured: true
  },
  {
    id: '8',
    name: 'Printed Geometric Casual Shirt',
    price: 449,
    mrp: 999,
    description: 'Fun geometric prints. Polyester blend, wrinkle-free and easy to wash.',
    image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=1000&auto=format&fit=crop',
    category: 'Casual',
    sizes: ['S', 'M', 'L'],
    rating: 3.8,
    reviews: 450,
    assured: false
  }
];

export const UPI_ID = 'merchant@upi'; 
export const UPI_NAME = 'Nilex07 Store';