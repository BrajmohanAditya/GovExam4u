import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <div className="flex min-h-screen w-full">
            {/* admin sidebar */}
            <div className="flex flex-1 flex-col">
                {/* admin header */}
                <AdminHeader setOpen={setOpenSidebar} />

            </div>
        </div>
    );
}

export default AdminLayout;