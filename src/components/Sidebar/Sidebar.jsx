'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {

  const pathname = usePathname();

  // Extract the last part of the path
  const activeRoute = pathname.split("/").pop();

    return (
      <div className="w-64 bg-gray-800 text-white h-full fixed top-0 left-0">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <ul className="mt-6">
            <li className={`py-2 px-4 hover:bg-gray-700 rounded ${activeRoute == 'dashboard' ? "bg-gray-700 rounded" : ""}`}>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li  className={`py-2 px-4 hover:bg-gray-700 rounded ${activeRoute == 'users' ? "bg-gray-700 rounded" : ""}`}>
            <Link href="/admin/users">Users</Link>
            </li>
            <li className="py-2 px-4 hover:bg-gray-700 rounded">
              <Link href="/">Home Page</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  