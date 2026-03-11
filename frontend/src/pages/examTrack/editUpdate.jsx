// Aim: This page if for edit and update form.
// Aim:  added BootsTrap validation in form(novalidate class="needs-validation").

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import apis from "./apis";
import httpAction from "../../services/httpAction.js";

export default function ExamEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  //step: A2, aim: edit editUpdate form,  work : backend k "/examTrack/${id}/edit" route seh data receive kr raha hai or form meh daal raha hai

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          url: apis().fetchData(id),
          method: "GET",
        };
        const result = await httpAction(data);

        // httpAction returns the parsed JSON on success, or { status: false, error }
        const payload = result?.data ?? result;
        if (payload) {
          setExam(payload);
        }
      } catch (err) {
        console.error('Failed to fetch exam:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  //---

  if (loading) return <p>Loading...</p>;
  if (!exam) return <p>Exam not found</p>;

  //step: A2, aim: edit krna hai  editUpdate form ko,  work : backend(examtrack.js) k ak route ko data send kr raha hai.


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = {
          url: apis().editExam(id),
          method: "PUT",
          body: exam,
        };
        const result = await httpAction(data);
  
        // httpAction returns `{ status: false, error }` on failure
        if (result?.status === false) {
          alert(result?.error || "Failed to edit exam");
          return;
        }
  
        alert(result?.message || "Exam edited successfully");
        navigate("/examTracker", { replace: true });
      } catch (err) {
        alert("An error occurred while editing the exam.");
      }
    };
  //--

  // Delete route
  const deleteHandler = async () => {
    const data = {
      url: apis().deleteExam(id),
      method: "DELETE",
    };

    const result = await httpAction(data);
    if (result?.status === false) {
      alert(result?.error || "Failed to delete");
      return;
    }
    toast.success(result?.message || "Card Deleted");
    navigate("/examTracker", { replace: true });
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
        onClick={deleteHandler}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </form>
  );
}
