// Aim: This page if for edit and update form. 
// Aim:  added BootsTrap validation in form(novalidate class="needs-validation").

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

export default function ExamEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  //aim :  backend k "/examTrack/${id}/edit" route seh data receive kr raha hai.
  useEffect(() => {
    api
      .get(`/examTrack/${id}/edit`)
      .then((res) => {
        setExam(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);
  //---

  if (loading) return <p>Loading...</p>;

  // (Update form submit) backend k ak route ko data send kr raha hai.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/examTrack/${id}`, exam);
      alert("Exam updated successfully!");
      navigate("/examTracker"); // redirect back to exam list
    } catch (err) {
      console.error(err);
      alert("Failed to update exam.");
    }
  };
  //--

  // Delet route
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        await api.delete(`/examTrack/${id}`);
        alert("Exam deleted successfully!");
        navigate("/examTracker"); // redirect after delete
      } catch (err) {
        alert("Failed to delete exam.");
      }
    }
  };
//-- 
  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      className="p-6 bg-amber-50 shadow-md rounded-xl max-w-md mx-auto mt-10"
    >
      <h2 className="text-xl font-bold mb-4">Edit Exam</h2>
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
        value={new Date(exam.Pre).toISOString().split("T")[0]}
        onChange={(e) => setExam({ ...exam, Pre: e.target.value })}
        className="border p-2 w-full rounded mb-4"
      />
      <label className="block mb-2">Mains Date</label>
      <input
        type="date"
        value={new Date(exam.Mains).toISOString().split("T")[0]}
        onChange={(e) => setExam({ ...exam, Mains: e.target.value })}
        className="border p-2 w-full rounded mb-4"
      />
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save
      </button>
      &nbsp;&nbsp;
      <button
        type="button"
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </form>
  );
}
