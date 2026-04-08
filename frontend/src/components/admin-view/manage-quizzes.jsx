import React from "react";
import { GraduationCap, Landmark, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ManageQuizzes() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-6xl mx-auto">


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Class 6 to 10 Card */}
        <div
          onClick={() => navigate("/admin/quizzes/school")}
          className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-8 shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-300"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>

          <div className="flex items-start justify-between">
            <div className="bg-indigo-50 p-4 rounded-xl text-indigo-600 mb-6 transition-colors group-hover:bg-indigo-100">
              <GraduationCap size={40} className="stroke-[1.5]" />
            </div>
            <div className="bg-gray-50 p-2 rounded-full text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <ArrowRight size={20} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Class 6 to 10</h2>
          <p className="text-gray-500 leading-relaxed text-sm">
            Manage academic quizzes by class, grade level, and subject. Includes structured tests for school curriculum.
          </p>
        </div>

        {/* Banking Card */}
        <div
          onClick={() => navigate("/admin/allSubjectQuize/add-Quize")}
          className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-8 shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-emerald-300"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>

          <div className="flex items-start justify-between">
            <div className="bg-emerald-50 p-4 rounded-xl text-emerald-600 mb-6 transition-colors group-hover:bg-emerald-100">
              <Landmark size={40} className="stroke-[1.5]" />
            </div>
            <div className="bg-gray-50 p-2 rounded-full text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <ArrowRight size={20} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Banking & Competitive</h2>
          <p className="text-gray-500 leading-relaxed text-sm">
            Manage quizzes for bank PO, Clerk, and other competitive exams. Categorized by quantitative reasoning, English, etc.
          </p>
        </div>
      </div>
    </div>
  );
}
