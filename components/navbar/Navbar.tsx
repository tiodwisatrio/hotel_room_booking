import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navlink from "./Navlink";

const Navbar = () => {
  return (
    <div
      className="fixed top-0 w-full bg-[var(--background)]/60 backdrop-blur-md shadow-sm z-20"
      style={{ WebkitBackdropFilter: "blur(8px)" }}
    >
      <div className="max-w-screen mx-auto flex flex-wrap items-center justify-between py-1 px-8">
        <Link href="/">
          <Image
            src="/elysian_logo.png"
            width={56}
            height={56}
            alt="Logo"
            priority
          />
        </Link>
        <Navlink />
      </div>
    </div>
  );
};

export default Navbar;
