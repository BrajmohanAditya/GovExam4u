import { AlignJustify, LogOut, Search, Bell } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth/auth-slice";
import { useNavigate } from "react-router-dom";

function AdminHeader({ setOpen }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser()).then(() => {
            navigate("/");
        });
    };
    
    return (
        <header className="flex flex-col">
            <div className="flex items-center justify-between px-6 py-[18px] bg-white border-b border-gray-100 shadow-sm/50">
                <div className="flex items-center gap-4">
                    <button onClick={() => setOpen(true)} className="lg:hidden sm:block text-gray-500 hover:bg-gray-50 p-2 rounded-md transition-colors">
                        <AlignJustify className="w-5 h-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </button>
                    
                    {/* Search bar for uniform modern aesthetic */}
                    <div className="hidden lg:flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200/60 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search quizzes, students..." 
                            className="bg-transparent border-none outline-none text-sm w-64 placeholder:text-gray-400 text-gray-700" 
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="relative p-2.5 text-gray-500 hover:bg-gray-50 rounded-full transition-colors border border-transparent hover:border-gray-200">
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    
                    <div className="h-6 w-px bg-gray-200 mx-1"></div>

                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors border border-transparent hover:border-red-100"
                    >
                        <LogOut size={16} strokeWidth={2.5} />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;
