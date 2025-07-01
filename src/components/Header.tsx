import React from "react";

export default function Header(): JSX.Element {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Movies Website</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/about" className="hover:text-blue-400">About</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};