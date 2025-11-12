import { Suspense } from "react";
import { Products } from "../components/products/Products";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

// Example static product data for development. You can add more items!
const exampleProducts = [
  {
    _id: "local1",
    title: "Demo T-Shirt",
    description: "100% cotton comfy T-shirt",
    price: 499,
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "white"],
    images: [
      "https://res.cloudinary.com/dr8ogepyt/image/upload/v1762800924/ujrb1ugaqeomuviackcn.jpg"
    ],
    inStock: true,
    createdAt: "2025-11-12T12:00:00Z"
  },
  {
    _id: "local2",
    title: "Demo Jeans",
    description: "Blue denim jeans, regular fit.",
    price: 1299,
    category: "men",
    sizes: ["M", "L", "XL"],
    colors: ["blue"],
    images: [
      "https://res.cloudinary.com/dr8ogepyt/image/upload/v1762806914/products/hgdojwt7iyggicdzngdp.jpg"
    ],
    inStock: true,
    createdAt: "2025-11-12T12:00:00Z"
  }
  // Add more demo products if desired
];

const AllProducts = async () => {
  // Use static data instead of real database fetch:
  const products = exampleProducts;

  // For production, switch back to:
  // const products = await getAllProducts();

  return <Products products={products} extraClassname="" />;
};

const Home = async () => {
  return (
    <section class
