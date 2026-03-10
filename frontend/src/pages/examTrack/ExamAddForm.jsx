import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apis from "./apis";
import httpAction from "../loginLogout/utils/httpAction";
export default function ExamAddForm() {
  const navigate = useNavigate();
  const [exam, setExam] = useState({
    Exam: "",
    Pre: "",
    Mains: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        url: apis().addExam,
        method: "POST",
        body: exam,
      };
      const result = await httpAction(data);

      // httpAction returns `{ status: false, error }` on failure
      if (result?.status === false) {
        alert(result?.error || "Failed to add exam");
        return;
      }

      alert(result?.message || "Exam added successfully");
      navigate("/examTracker", { replace: true });
    } catch (err) {
      alert("An error occurred while adding the exam.");
    }
  };
  //---
  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-green-50 shadow-md rounded-xl max-w-md mx-auto mt-10"
    >
      <h2 className="text-xl font-bold mb-4">Add New Exam</h2>

      <label className="block mb-2">Exam Name</label>
      <input
        type="text"
        value={exam.Exam}
        onChange={(e) => {
          let charCount = e.target.value.length;
          if (charCount <= 20) {
            setExam({ ...exam, Exam: e.target.value });
          }
        }}
        className="border p-2 w-full rounded mb-4"
        required
      />

      <label className="block mb-2">Pre Date</label>
      <input
        type="date"
        value={exam.Pre}
        onChange={(e) => setExam({ ...exam, Pre: e.target.value })}
        className="border p-2 w-full rounded mb-4"
        required
      />

      <label className="block mb-2">Mains Date</label>
      <input
        type="date"
        value={exam.Mains}
        onChange={(e) => setExam({ ...exam, Mains: e.target.value })}
        className="border p-2 w-full rounded mb-4"
        required
      />

      <button // aim: Adding new card.(yaha seh backend ko request jayaga or wo db meh data add kr dega)
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Exam
      </button>
    </form>
  );
}
