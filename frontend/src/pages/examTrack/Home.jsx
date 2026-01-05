

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { calculateTimeLeft } from "./timeLeft";
import Nav from "./Navbar";
import api from "../../api";

export default function ExamTrack() {
  const [exams, setExams] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const navigate = useNavigate();

  /* ================= FETCH EXAMS ================= */
  useEffect(() => {
    api
      .get("/examTrack")
      .then((res) => setExams(res.data))
      .catch((err) => {
        if (err.response) {
          console.error("Error:", err.response.data.message);
          if (err.response.status === 401) {
            alert(err.response.data.message);
            navigate("/login");
          }
        } else {
          console.error("Unexpected error:", err);
        }
      });
  }, [navigate]);

  /* ================= TIME LEFT CALCULATION ================= */
  useEffect(() => {
    const updateTimeLeft = () => {
      const newTimeLeft = {};

      exams.forEach((exam) => {
        newTimeLeft[exam._id] = {
          pre: calculateTimeLeft(exam.Pre),
          mains: calculateTimeLeft(exam.Mains),
        };
      });

      setTimeLeft(newTimeLeft);
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000);

    return () => clearInterval(interval);
  }, [exams]);

  /* ================= UI ================= */
  return (
    <>
      <Nav />

      <div className="p-4 max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 rounded-md">
        {exams.length === 0 ? (
          /* ---------- EMPTY INSTRUCTION ---------- */
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-20">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
              <p className="text-lg text-gray-600 font-medium">
                Please add an exam. I will show how many days are remaining for
                Pre & Mains.
              </p>
            </div>
          </div>
        ) : (
          /* ---------- EXAM CARDS ---------- */
          exams.map((exam) => (
            <Link to={`/exam/${exam._id}/edit`} key={exam._id}>
              <div className="bg-linear-to-r/oklab from-indigo-500 to-teal-400 rounded-xl p-5 w-full card-wrapper">
                <h2 className="text-lg font-bold text-white">{exam.Exam}</h2>

                <p className="text-gray-200">
                  Pre:{" "}
                  {new Date(exam.Pre).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <p className="text-gray-200">
                  Mains:{" "}
                  {new Date(exam.Mains).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                {timeLeft[exam._id] && (
                  <div>
                    <p
                      className={
                        typeof timeLeft[exam._id].pre === "string"
                          ? "text-red-700 font-bold"
                          : "text-yellow-300 font-semibold"
                      }
                    >
                      Pre:{" "}
                      {typeof timeLeft[exam._id].pre === "string"
                        ? timeLeft[exam._id].pre
                        : `${timeLeft[exam._id].pre.days} day ${
                            timeLeft[exam._id].pre.hours
                          } hr`}
                    </p>

                    <p className="text-yellow-300 font-semibold">
                      Mains:{" "}
                      {typeof timeLeft[exam._id].mains === "string"
                        ? timeLeft[exam._id].mains
                        : `${timeLeft[exam._id].mains.days} day ${
                            timeLeft[exam._id].mains.hours
                          } hr`}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
