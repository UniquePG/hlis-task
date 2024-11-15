'use client'
import TopBar from "@/components/topbar/Topbar";
import Link from "next/link";


export default function Home() {

  return (
    <>
      <TopBar />    
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Promocode management system</h1>

        <Link href={"/admin/dashboard"}>
          <button className="py-2 px-4 bg-blue-950 text-white rounded-md">
            Go to Admin dashboard
          </button>
        </Link>


    </div>
    </>
  );
}
