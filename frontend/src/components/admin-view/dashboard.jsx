import React from "react";
import { Users, FileText, CheckCircle, Activity, ChevronRight } from "lucide-react";

function AdminDashboard() {
    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm">
                        Export Data
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm shadow-indigo-600/20 transition-all flex items-center gap-2">
                        + Create Quiz
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {[
                    { label: "Total Students", value: "2,543", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Active Quizzes", value: "48", icon: FileText, color: "text-indigo-600", bg: "bg-indigo-50" },
                    { label: "Tests Completed", value: "12.4k", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Average Score", value: "76.4%", icon: Activity, color: "text-orange-600", bg: "bg-orange-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 lg:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:shadow-md hover:border-gray-200 transition-all cursor-default">
                        <div className={`p-3.5 rounded-xl ${stat.bg} transition-transform group-hover:scale-105`}>
                            <stat.icon className={`w-6 h-6 stroke-[2.5px] ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Student Sign-ups</h2>
                        <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 px-3 py-1.5 outline-none">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center justify-center h-[300px] text-gray-400 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                        <Activity className="w-10 h-10 mb-3 text-indigo-300" />
                        <p className="text-sm font-medium text-gray-500">Analytics chart rendering will appear here</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">View all</button>
                    </div>
                    <div className="flex flex-col gap-5 flex-1 justify-start">
                        {[
                            { title: "New user registered", time: "2 minutes ago", initial: "U", color: "bg-blue-100 text-blue-700" },
                            { title: "SSC Mock Test published", time: "1 hour ago", initial: "M", color: "bg-purple-100 text-purple-700" },
                            { title: "Results calculated", time: "3 hours ago", initial: "R", color: "bg-emerald-100 text-emerald-700" },
                            { title: "Daily DPP updated", time: "5 hours ago", initial: "D", color: "bg-amber-100 text-amber-700" },
                            { title: "System maintenance", time: "Yesterday", initial: "S", color: "bg-gray-100 text-gray-700" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${item.color} flex-shrink-0`}>
                                    {item.initial}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
