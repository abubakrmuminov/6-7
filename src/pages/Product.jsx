import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => setProduct(res))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-white p-6">loading...</div>;
  if (error)
    return (
      <div className="text-red-500 p-6">
        hatolik chiqdi, sahifani yangilavoring
      </div>
    );
  if (!product) return null;

  return (
    <div className="bg-black text-white min-h-screen px-4 md:px-10 py-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="bg-white rounded-xl p-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[500px] object-contain"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-2 text-yellow-400">
            <span>⭐ {product.rating?.rate}</span>
            <span className="text-sm text-neutral-400">
              ({product.rating?.count} reviews)
            </span>
          </div>

          <div className="text-3xl font-semibold mt-4">${product.price}</div>

          <p className="text-neutral-300 text-sm leading-relaxed mt-2">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
