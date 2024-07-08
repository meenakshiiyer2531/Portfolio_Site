import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
        <Link href ="/">
      <Image
                  src="/images/logo.png" // Adjust path as per your directory structure
                  alt="Logo"
                  width={80} // Adjust width as needed
                  height={80} // Adjust height as needed
                />
                </Link>
        <p className="text-slate-600">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
