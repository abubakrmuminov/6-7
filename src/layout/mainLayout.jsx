import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-wide">
          abubakr
        </Link>
        <nav className="flex gap-6 text-sm">
          <NavLink
            to="/products"
          >
            Products
          </NavLink>
          <NavLink
            to="/users"
          >
            Users
          </NavLink>
        </nav>
      </header>

      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      <footer className="border-t border-neutral-800 text-center text-sm text-neutral-500 py-4">
        © 2025 abubakr. All rights reserved.
      </footer>
    </div>
  );
}
