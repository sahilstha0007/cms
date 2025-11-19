"use client";

import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center mt-4 ">
      <div className="
        w-[80%] 
        backdrop-blur-md 
        bg-gray-100/70 
        border border-gray
        rounded-full
        px-6 py-3 
        flex items-center justify-between
      ">
        
        <div className="flex items-center gap-3">
            <Image src='OrionLogo.png' height={100} width={100} alt="Logo"/>
        </div>

        <div className="flex items-center gap-6">


          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="text-gray-800 hover:text-lime-600 transition"
              >
                {item.label}
              </Link>
            ))}
          </div>


          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="
                border border-gray-500
                text-gray-500
                px-4 py-2 
                rounded-full 
                hover:bg-lime-500 hover:text-white hover:border-lime-500
                transition
              "
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="
                bg-lime-500 
                text-white 
                px-4 py-2 
                rounded-full 
                hover:bg-lime-600 
                transition
              "
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
