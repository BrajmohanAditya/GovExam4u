import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import apis from "../../../apis/bankingQuizApi.js";
import httpAction from "../../../services/httpAction.js";
import { FileText, Plus, Landmark } from "lucide-react";

export default function ManageSets() {
  const navigate = useNavigate();
  const [sets, setSets] = useState([]);
  const [lockMap, setLockMap] = useState({});
  const [liveMap, setLiveMap] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch all questions to extract unique sets
      const quizRes = await httpAction({ url: apis().getQuiz, method: "GET" });
      
      let uniqueSets = [];
      if (quizRes?.status) {
        uniqueSets = [...new Set(quizRes.data.map((q) => q.set))].sort((a, b) => {
          const textA = a.replace(/[0-9]/g, "").trim();
          const textB = b.replace(/[0-9]/g, "").trim();
          if (textA !== textB) return textA.localeCompare(textB);
          const na = parseInt(a.replace(/\D/g, ""), 10) || 0;
          const nb = parseInt(b.replace(/\D/g, ""), 10) || 0;
          return na - nb;
        });
        setSets(uniqueSets);
      }

      // Fetch Lock status
      const lockRes = await httpAction({ url: apis().lockStatus, method: "GET" });
      if (lockRes?.status) {
        const lMap = {};
        lockRes.data.forEach((item) => {
          lMap[item.set] = item.isLocked;
        });
        setLockMap(lMap);
      }

      // Fetch Live status
      const liveRes = await httpAction({ url: apis().liveStatus, method: "GET" });
      if (liveRes?.status) {
        const lvMap = {};
        liveRes.data.forEach((item) => {
          lvMap[item.set] = item.isLive;
        });
        setLiveMap(lvMap);
      }
    } catch (error) {
      toast.error("Failed to load sets data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleToggleLock = async (setName, newValue) => {
    const res = await httpAction({
      url: apis().toggleLock(setName),
      method: "PUT",
      body: { isLocked: newValue },
    });

    if (res?.status) {
      setLockMap((prev) => ({ ...prev, [setName]: res.isLocked }));
      toast.success(`Set ${setName} is now ${res.isLocked ? "Locked" : "Unlocked"}`);
    } else {
      toast.error(res?.message || "Lock update failed");
    }
  };

  const handleToggleLive = async (setName, newValue) => {
    const res = await httpAction({
      url: apis().toggleLive(setName),
      method: "PUT",
      body: { isLive: newValue },
    });

    if (res?.status) {
      setLiveMap((prev) => ({ ...prev, [setName]: res.isLive }));
      toast.success(`Set ${setName} is now ${res.isLive ? "Live" : "Unlive"}`);
    } else {
      toast.error(res?.message || "Live update failed");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800">
            <Landmark className="text-emerald-600" size={32} />
            Banking Quizzes
          </h1>
          <p className="text-gray-500 mt-2">
            Manage the availability and status of different banking test sets.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/bankingQuiz/add-Quize")}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium shadow-sm"
        >
          <Plus size={20} />
          Create New Question
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading sets...</div>
        ) : sets.length === 0 ? (
          <div className="p-8 text-center flex flex-col items-center">
            <FileText size={48} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Quiz Sets Found</h3>
            <p className="text-gray-500">It looks like there are no active quiz questions.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 font-semibold text-gray-600">Set Name</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Live Status</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Lock Status</th>
                  <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sets.map((set) => {
                  const isLive = liveMap[set];
                  const isLocked = lockMap[set];

                  return (
                    <tr key={set} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                        <FileText className="text-gray-400" size={18} />
                        {set}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isLive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {isLive ? "● Live" : "● Offline"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isLocked ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {isLocked ? "🔒 Locked" : "🔓 Unlocked"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2 text-sm">
                          <button
                            onClick={() => handleToggleLive(set, !isLive)}
                            className={`px-4 py-1.5 rounded-md font-medium transition-colors ${
                              isLive
                                ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                                : "bg-green-600 text-white hover:bg-green-700 shadow-sm"
                            }`}
                          >
                            {isLive ? "Take Offline" : "Go Live"}
                          </button>
                          <button
                            onClick={() => handleToggleLock(set, !isLocked)}
                            className={`px-4 py-1.5 rounded-md font-medium transition-colors ${
                              isLocked
                                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                                : "bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm"
                            }`}
                          >
                            {isLocked ? "Unlock" : "Lock Test"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
