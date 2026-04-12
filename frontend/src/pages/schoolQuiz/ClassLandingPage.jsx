import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/BankingQuiz/navbar";

export default function ClassLandingPage() {
  const navigate = useNavigate();

  const classes = [
    {
      id: "6",
      title: "Class 6",
      desc: "Begin your learning journey with foundational quizzes.",
      color: "from-blue-500 to-cyan-400",
      icon: "📚",
    },
    {
      id: "7",
      title: "Class 7",
      desc: "Step up your game and explore new concepts.",
      color: "from-purple-500 to-pink-500",
      icon: "🔬",
    },
    {
      id: "8",
      title: "Class 8",
      desc: "Dive deeper into advanced topics and challenge yourself.",
      color: "from-orange-500 to-amber-400",
      icon: "⚡",
    },
    {
      id: "9",
      title: "Class 9",
      desc: "Prepare for high school with rigorous quiz sets.",
      color: "from-emerald-500 to-teal-400",
      icon: "🎓",
    },
    {
      id: "10",
      title: "Class 10",
      desc: "Master the crucial board-level concepts with practice.",
      color: "from-rose-500 to-red-500",
      icon: "🏆",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/80 text-slate-800 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          {/* Header Section */}
          <div className="text-center mb-16 space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500 tracking-tight">
              Select Your Class
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium">
              Choose your standard to dive into tailored MCQs and Reading Comprehensions designed specifically for your curriculum.
            </p>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
            {classes.map((cls) => (
              <div 
                key={cls.id}
                onClick={() => navigate(`/schoolQuiz/${cls.id}`)}
                className="group cursor-pointer relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2 border border-slate-200/60 overflow-hidden"
              >
                {/* Background Gradient Blob */}
                <div className={`absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br ${cls.color} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                
                <div className="relative z-10 flex flex-col items-center text-center gap-4">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${cls.color} flex items-center justify-center text-4xl text-white shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform duration-300 ease-out`}>
                    {cls.icon}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-600 transition-colors">
                      {cls.title}
                    </h3>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed">
                      {cls.desc}
                    </p>
                  </div>

                  <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors">
                    View Quizzes 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
