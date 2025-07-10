import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
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
            <div className="h-6 w-1/2 bg-neutral-700 rounded" />
            <div className="h-4 w-2/3 bg-neutral-800 rounded" />
            <div className="h-4 w-1/3 bg-neutral-700 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error)
    return (
      <div className="bg-black min-h-screen flex justify-center items-center text-red-500">
        hatolik chiqdi, sahifani yangilavoring
      </div>
    );

  return (
    <div className="bg-black text-white min-h-screen p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {users.map((user) => (
        <Card
          key={user.id}
          className="relative flex flex-col justify-between bg-neutral-900 border border-neutral-800 text-white p-6"
        >
          <CardHeader className="pb">
            <CardTitle className="capitalize text-xl">
              {user.name.firstname} {user.name.lastname}
            </CardTitle>
            <CardDescription className="text-neutral-400 text-sm">
              @{user.username}
            </CardDescription>
          </CardHeader>

          <CardContent className="text-sm text-neutral-300 space-y-2 mt-2">
            <p className="flex items-center gap-2">
              {user.email}
            </p>
            <p className="flex items-center gap-2">
              {user.phone}
            </p>
            <p className="flex items-center gap-2">
              {user.address.city}, {user.address.street}
            </p>
          </CardContent>

          <CardFooter className="pt-4">
            <Link
              to={`/user/${user.id}`}
              className="w-full text-center bg-transparent border border-neutral-700 hover:bg-neutral-800 transition text-white text-sm py-2 rounded-md"
            >
              View Profile
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
