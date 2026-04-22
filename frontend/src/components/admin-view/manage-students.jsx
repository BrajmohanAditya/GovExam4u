import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, Edit, X } from "lucide-react";

export default function ManageStudents() {
    const [students, setStudents] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        studentClass: "",
        status: "unpaid",
        whatsappNo: "",
        email: ""
    });
    const [loading, setLoading] = useState(false);

    // Fetch students
    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8080/students/get", { withCredentials: true });
            if (response.data.success) {
                setStudents(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch students", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle add student
    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/students/add", formData, { withCredentials: true });
            if (response.data.success) {
                setIsAddModalOpen(false);
                setFormData({ name: "", studentClass: "", status: "unpaid", whatsappNo: "", email: "" });
                fetchStudents();
            }
        } catch (error) {
            console.error("Failed to add student", error);
            alert("Failed to add student. Please ensure all fields are correctly filled.");
        }
    };

    // Handle delete student
    const handleDeleteStudent = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;
        
        try {
            const response = await axios.delete(`http://localhost:8080/students/delete/${id}`, { withCredentials: true });
            if (response.data.success) {
                fetchStudents();
            }
        } catch (error) {
            console.error("Failed to delete student", error);
            alert("Failed to delete student.");
        }
    };

    // Handle update status directly from table
    const handleStatusChange = async (id, newStatus) => {
        try {
            const studentToUpdate = students.find(s => s._id === id);
            const response = await axios.put(`http://localhost:8080/students/update/${id}`, {
                ...studentToUpdate,
                status: newStatus
            }, { withCredentials: true });
            
            if (response.data.success) {
                fetchStudents();
            }
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status.");
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manage Students</h1>
                    <p className="text-sm text-gray-500 mt-1">View and manage all registered students</p>
                </div>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                >
                    <Plus size={18} /> Add Student
                </button>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-medium">
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Class</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">WhatsApp No</th>
                                <th className="px-6 py-4">Email ID</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">Loading students...</td>
                                </tr>
                            ) : students.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">No students found. Add a new student to get started.</td>
                                </tr>
                            ) : (
                                students.map((student) => (
                                    <tr key={student._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-800">{student.name}</td>
                                        <td className="px-6 py-4 text-gray-600">{student.studentClass}</td>
                                        <td className="px-6 py-4">
                                            <select 
                                                value={student.status}
                                                onChange={(e) => handleStatusChange(student._id, e.target.value)}
                                                className={`text-sm rounded-full px-3 py-1 font-medium border-0 focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
                                                    student.status === 'paid' 
                                                    ? 'bg-green-100 text-green-700' 
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                            >
                                                <option value="paid" className="bg-white text-gray-800">Paid</option>
                                                <option value="unpaid" className="bg-white text-gray-800">Unpaid</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{student.whatsappNo}</td>
                                        <td className="px-6 py-4 text-gray-600">{student.email}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => handleDeleteStudent(student._id)}
                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-flex"
                                                title="Delete Student"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Student Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Add New Student</h2>
                            <button 
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-gray-400 hover:bg-gray-100 hover:text-gray-600 p-1.5 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleAddStudent} className="p-6 flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Class / Category</label>
                                <select 
                                    name="studentClass"
                                    value={formData.studentClass}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                >
                                    <option value="" disabled>Select Class</option>
                                    <option value="Class 6">Class 6</option>
                                    <option value="Class 7">Class 7</option>
                                    <option value="Class 8">Class 8</option>
                                    <option value="Class 9">Class 9</option>
                                    <option value="Class 10">Class 10</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select 
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                >
                                    <option value="unpaid">Unpaid</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp No.</label>
                                <input 
                                    type="text" 
                                    name="whatsappNo"
                                    value={formData.whatsappNo}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="e.g. +91 9876543210"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="e.g. john@example.com"
                                />
                            </div>
                            
                            <div className="flex gap-3 mt-4">
                                <button 
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    Save Student
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
