import {
    LayoutDashboard,
    BookOpenCheck,
    Users,
    FileQuestion,
    Trophy,
    Settings,
    GraduationCap
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const adminSidebarMenuItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
        id: "quizzes",
        label: "Manage Quizzes",
        path: "/admin/quizzes",
        icon: <BookOpenCheck className="w-5 h-5" />,
    },
    {
        id: "questions",
        label: "Question Bank",
        path: "/admin/questions",
        icon: <FileQuestion className="w-5 h-5" />,
    },
    {
        id: "users",
        label: "Students",
        path: "/admin/users",
        icon: <Users className="w-5 h-5" />,
    },
    {
        id: "results",
        label: "Results & Reports",
        path: "/admin/results",
        icon: <Trophy className="w-5 h-5" />,
    },
    {
        id: "settings",
        label: "Settings",
        path: "/admin/settings",
        icon: <Settings className="w-5 h-5" />,
    },
];

function MenuItems({ setOpen }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="mt-2 flex flex-col gap-1.5 px-3">
            {adminSidebarMenuItems.map((menuItem) => {
                const isActive = location.pathname.includes(menuItem.path);

                return (
                    <div
                        key={menuItem.id}
                        onClick={() => {
                            navigate(menuItem.path);
                            // Only call setOpen if it's passed (for mobile view when added)
                            if (setOpen) setOpen(false);
                        }}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${isActive
                                ? "bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/20"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                    >
                        {menuItem.icon}
                        <span className="text-[15px]">{menuItem.label}</span>
                    </div>
                );
            })}
        </nav>
    );
}

function AdminSideBar({ open, setOpen }) {
    const navigate = useNavigate();

    return (
        <Fragment>
            {/* Desktop Sidebar */}
            <aside className="hidden w-[260px] flex-col border-r border-gray-200 bg-white lg:flex min-h-screen shadow-sm z-10 transition-all duration-300">
                {/* Logo Section */}
                <div
                    onClick={() => navigate("/admin/dashboard")}
                    className="flex cursor-pointer items-center gap-3 px-6 py-5 border-b border-gray-100"
                >
                    <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm">
                        <GraduationCap className="text-white w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold tracking-tight text-gray-900 leading-tight">GovExam4u</h1>
                        <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">Admin Portal</span>
                    </div>
                </div>

                {/* Menu Section */}
                <div className="flex-1 overflow-auto py-2 mt-4 scrollbar-thin scrollbar-thumb-gray-200">
                    <div className="px-6 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Main Menu
                    </div>
                    <MenuItems />
                </div>

                {/* Footer Section */}
                <div className="p-4 border-t border-gray-100 mt-auto">
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl p-4 border border-indigo-100/50">
                        <p className="text-sm font-semibold text-indigo-900">Need Help?</p>
                        <p className="text-xs text-indigo-700 mt-1 mb-3">Check the documentation or contact dev support.</p>
                        <button className="w-full bg-white text-indigo-600 text-xs font-semibold py-2 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors shadow-sm">
                            View Docs
                        </button>
                    </div>
                </div>
            </aside>
        </Fragment>
    );
}

export default AdminSideBar;
