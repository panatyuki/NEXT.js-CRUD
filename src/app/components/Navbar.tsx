import React from "react";
import Link from "next/link";

// Image.
import Image from "next/image";
import vercelLogo from "/public/logo-vercel.png";

function Navbar() {
  return (
    <nav className="text-sm py-4 mb-5 border-b border-b-gray-400">
      <header className="flex items-center gap-2">
        <Link href="/">
          <Image
            src={vercelLogo}
            alt="Logo"
            width={50}
            height={50}
            className="hover:cursor-pointer"
          />
        </Link>

        <h1 className="text-2xl hover:cursor-pointer">
          <Link href="/">NEXT.js CRUD</Link>
        </h1>
      </header>
    </nav>
  );
}

export default Navbar;

