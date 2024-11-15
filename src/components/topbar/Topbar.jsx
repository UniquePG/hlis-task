'use client';
import Link from 'next/link';

const TopBar = () => {
  return (
    <header className="bg-gray-800 text-white py-4 shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-14 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">
            HyperLink
          </Link>
        </div>

        {/* Login and Signup Buttons */}
        <div className="space-x-4">
          <Link href="/login" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
            Login
          </Link>
          <Link href="/signup" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors">
            Signup
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
