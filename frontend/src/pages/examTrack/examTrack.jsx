
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
export default function ExamTrack() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/examTrack")
      .then((res) => setExams(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="ml-0 md:m-20 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {exams.map((exam) => (
        <Link to={`/exam/${exam._id}/edit`} key={exam._id}>
          <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 w-[80%]">
            <h2 className="text-lg font-semibold text-gray-800">{exam.Exam}</h2>
            <p className="text-gray-600">
              Pre:{" "}
              {new Date(exam.Pre).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-gray-600">
              Mains:{" "}
              {new Date(exam.Mains).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
