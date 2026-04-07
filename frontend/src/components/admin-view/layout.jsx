import AdminHeader from "./header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";

function AdminLayout() {
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
            {/* admin sidebar */}
            <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* admin header */}
                <AdminHeader setOpen={setOpenSidebar} />
                <main className="flex-1 overflow-y-auto bg-gray-50/50 p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;