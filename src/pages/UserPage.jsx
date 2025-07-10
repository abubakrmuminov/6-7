import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <div className="p-6 text-center text-white">Loading...</div>;
  if (error)
    return (
      <div className="p-6 text-red-500 text-center">
        hatolik chiqdi, sahifani yangilavoring
      </div>
    );
  if (!user) return null;

  return (
    <div className="bg-black text-white min-h-screen px-6 py-12 flex flex-col items-center gap-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold capitalize">
          {user.name.firstname} {user.name.lastname}
        </h1>
        <p className="text-neutral-500 mt-1">@{user.username}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <div className="border border-neutral-800 bg-neutral-900 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            Contact Information
          </h2>
          <div className="text-sm text-neutral-300 space-y-2 pl-2">
            <p className="flex items-center gap-2">{user.email}</p>
            <p className="flex items-center gap-2">{user.phone}</p>
          </div>
        </div>

        <div className="border border-neutral-800 bg-neutral-900 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            Address
          </h2>
          <div className="text-sm text-neutral-300 space-y-2 pl-2">
            <p className="flex items-center gap-2">
              {user.address.street} {user.address.number}
            </p>
            <p className="flex items-center gap-2">
              {user.address.city}, {user.address.zipcode}
            </p>
          </div>
        </div>
      </div>

      <div className="border border-neutral-800 bg-neutral-900 rounded-xl p-6 shadow-sm w-full max-w-4xl space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          User Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-300 pl-2">
          <div>
            <p className="text-neutral-500">Full Name</p>
            <p className="capitalize">
              {user.name.firstname} {user.name.lastname}
            </p>
          </div>
          <div>
            <p className="text-neutral-500">Username</p>
            <p>@{user.username}</p>
          </div>
          <div>
            <p className="text-neutral-500">Location Coordinates</p>
            <p>
              {user.address.geolocation.lat}, {user.address.geolocation.long}
            </p>
          </div>
          <div>
            <p className="text-neutral-500">User ID</p>
            <p className="inline-block bg-neutral-700 px-2 py-0.5 rounded text-xs font-semibold">
              #{user.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
