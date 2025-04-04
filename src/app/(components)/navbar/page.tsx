"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/">
        <h1 className="text-2xl font-bold text-red-500">MovieZone</h1>
      </Link>

      <ul className="hidden md:flex space-x-6">
        <li>
          <Link href="/" className="hover:text-red-400 transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/movies" className="hover:text-red-400 transition">
            Movies
          </Link>
        </li>
        <li>
          <Link href="/series" className="hover:text-red-400 transition">
            Series
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-red-400 transition">
            Contact
          </Link>
        </li>
      </ul>

      <div className="hidden md:flex space-x-4">
        <Button
          variant="outline"
          className="border-red-500 bg-red-500 text-white hover:bg-red-500"
        >
          Login
        </Button>
        <Button className="bg-red-500 hover:bg-red-600">Sign Up</Button>
      </div>

      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        <Menu size={28} />
      </button>

      {menuOpen && (
        <div className=" z-[999] absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center py-4 space-y-4 md:hidden">
          <Link href="/" className="hover:text-red-400 transition">
            Home
          </Link>
          <Link href="/movies" className="hover:text-red-400 transition">
            Movies
          </Link>
          <Link href="/series" className="hover:text-red-400 transition">
            Series
          </Link>
          <Link href="/contact" className="hover:text-red-400 transition">
            Contact
          </Link>
          <Button
            variant="outline"
            className="border-red-500 text-red-800 w-full"
          >
            Login
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 w-full">
            Sign Up
          </Button>
        </div>
      )}
    </nav>
  );
}
