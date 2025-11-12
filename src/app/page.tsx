"use client"; // Add this at the top only if your products or skeleton uses hooks/events

import { Suspense } from "react";
import { Products } from "../components/products/Products";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

// Example static product data for local development
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
      "https://res.cloudinary.com/dr8ogepyt/image/upload/v1762800924/ujrb1ugaqeomuviackcn.jpg",
    ],
    inStock: true,
    createdAt: "2025-11-12T12:00:00Z",
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
      "https://res.cloudinary.com/dr8ogepyt/image/upload/v1762806914/products/hgdojwt7iyggicdzngdp.jpg",
    ],
    inStock: true,
    createdAt: "2025-11-12T12:00:00Z",
  },
  // Add more demo products as needed
];

function AllProducts() {
  // Use local array for development; switch back to DB fetch when fixed
  const products = exampleProducts;
  return <Products products={products} extraClassname="" />;
}

export default function Home() {
  return (
    <section className="pt-14">
      <Suspense fallback={<ProductSkeleton extraClassname="" numberProducts={18} />}>
        <AllProducts />
      </Suspense>
    </section>
  );
}
