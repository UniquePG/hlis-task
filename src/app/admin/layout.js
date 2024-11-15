import Sidebar from "@/components/Sidebar/Sidebar";


export default function AdminLayout({ children }) {
  return (
    <>
        <Sidebar />
        <div className="ml-64">
            {children}

        </div>
    
    </>
  );
}
