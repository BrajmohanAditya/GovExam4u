
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ExamEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  // Backend se exam fetch karna
  useEffect(() => {
    axios
      .get(`http://localhost:8080/examTrack/${id}/edit`)
      .then((res) => {
        setExam(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) return <p>Loading...</p>;

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/examTrack/${id}`, exam);
      alert("Exam updated successfully!");
      navigate("/examTracker"); // redirect back to exam list
    } catch (err) {
      console.error(err);
      alert("Failed to update exam.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      method="POST"

      className="p-6 bg-white shadow-md rounded-xl max-w-md mx-auto mt-10"
    >
      <h2 className="text-xl font-bold mb-4">Edit Exam</h2>

      <label className="block mb-2">Exam Name</label>
      <input
        type="text"
        value={exam.Exam}
        onChange={(e) => setExam({ ...exam, Exam: e.target.value })}
        className="border p-2 w-full rounded mb-4"
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
    </form>
  );
}
