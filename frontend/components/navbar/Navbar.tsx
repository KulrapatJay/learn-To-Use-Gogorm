'use client'

import Link from "next/link";
import { useState } from "react";
import NavItem from "./NavItem";
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext'

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart()
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { href: "/", label: "หน้าแรก" },
    { href: "/foods", label: "เมนู" },
    { href: "/create", label: "เพิ่มรายการอาหาร" },
    { href: "/cart", label: <span className="relative flex items-center">
      <ShoppingCart className="w-5 h-5" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </span> }
  ];

  return (
    <nav className="bg-orange-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-white text-2xl font-bold flex items-center"
        >
          <span className="mr-2">🍜</span> ร้านอาหาร
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`md:flex md:items-center md:space-x-6 ${
            isOpen ? "block" : "hidden"
          } absolute md:static top-16 left-0 right-0 bg-orange-500 md:bg-transparent p-4 md:p-0`}
        >
          {navItems.map((item) => (
            <NavItem key={item.href} href={item.href} label={item.label} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
