import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-black min-h-screen p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-4 animate-pulse"
          >
            <div className="h-4 bg-neutral-700 rounded w-3/4" />
            <div className="h-3 bg-neutral-700 rounded w-full" />
            <div className="h-40 bg-neutral-800 rounded-md" />
            <div className="h-4 bg-neutral-700 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }
  

  if (error)
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-center">
          Bratochek hatolik chiqdi, manda hammasi norm, znachit hatolik sizdan 😅
        </p>
      </div>
    );

  return (
    <div className="bg-black min-h-screen text-white p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((ui) => (
        <Card
          key={ui.id}
          className="flex flex-col justify-between bg-neutral-900 border border-neutral-800 text-white"
        >
          <CardHeader>
            <CardTitle className="text-base">{ui.title}</CardTitle>
            <CardDescription className="line-clamp-2 text-neutral-400">
              {ui.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex justify-center bg-white p-4 rounded-md">
            <img
              src={ui.image}
              alt={ui.title}
              className="h-40 object-contain"
            />
          </CardContent>

          <CardFooter className="flex justify-between items-center">
            <CardAction className="text-lg font-semibold">${ui.price}</CardAction>
            <Link to={`/product/${ui.id}`}>
              <Button variant="secondary">Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
