"use client";

import { Suspense } from "react";
import { Products } from "../components/products/Products";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

// Match the EnrichedProducts shape required by your component/types
const exampleProducts = [
  {
    _id: "local1",
    name: "Demo T-Shirt",            // REQUIRED
    title: "Demo T-Shirt",           // (Keep for UI consistency if needed)
    description: "100% cotton comfy T-shirt",
    price: 499,
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "white"],
    images: [
      "https://res.cloudinary.com/dr8ogepyt/image/upload/v1762800924/ujrb1ugaqeomuviackcn.jpg",
    ],
    image: "https://res.cloudinary.com/dr8ogepyt/image/upload/v1762800924/ujrb1ugaqeomuviackcn.jpg", // REQUIRED
    inStock: true,
    createdAt: "2025-11-12T12:00:00Z",
    color: "black",          // Add a color for type compatibility
    purchased: false,        // Dummy value for EnrichedProducts type
    // Add any other properties required by EnrichedProducts or Product model
  },
  {
    _id: "local2",
    name: "Demo Jeans",
    title: "Demo Jeans",
    description: "Blue denim jeans, regular fit.",
    price: 1299,
    category: "men",
    sizes: ["M", "L", "XL"],
    colors: ["blue"],
    images: [
      "https://res.cloudinary.com/dr8ogepyt/image/upload/v1762806914/products/hgdojwt7iyggicdzngdp.jpg",
    ],
    image: "https://res.cloudinary.com/dr8ogepyt/image/upload/v1762806914/products/hgdojwt7iyggicdzngdp.jpg",
    inStock: true,
    createdAt: "2025-11-12T12:00:00Z",
    color: "blue",
    purchased: false,
  },
];

function AllProducts() {
  // Now your products will satisfy EnrichedProducts[]
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
