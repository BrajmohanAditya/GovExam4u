import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { calculateTimeLeft } from "./timeLeft";
import Nav from "./Navbar";
import api from "../../api";

export default function ExamTrack() {
  const [exams, setExams] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const navigate = useNavigate(); // <-- yaha define karo

  //step: A0, aim: Display card, work: receiving data from backend.
  useEffect(() => {
    api
      .get("/examTrack") //examTrack route se tumhe sara exam ka data mil raha hai jo DB me save hai.
      .then((res) => setExams(res.data)) //setExams(res.data) use karke wo data state (exams) me save kar diya jata hai.
      .catch((err) => {
      if (err.response) {
        console.error("Error:", err.response.data.message);
        if (err.response.status === 401) {
          alert(err.response.data.message); //
          navigate("/login"); // React Router ka navigate use karo agar redirect karna ho
        }
      } else {
        console.error("Unexpected error:", err);
      }
    });
  }, [navigate]);
  //---

  //---

  // hook for calculation of time left
  useEffect(() => {
    const updateTimeLeft = () => {
      const newTimeLeft = {}; // empty object
      exams.forEach((exam) => {
        // console.log(exam);
        newTimeLeft[exam._id] = {
          pre: calculateTimeLeft(exam.Pre), // ya Pre ka date pass kr raha hai or calculateTimeLeft Day and Hour calculate kr k send kr dega
          mains: calculateTimeLeft(exam.Mains),
        };
      });
      setTimeLeft(newTimeLeft);
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000); // update updateTimeLeft after every 1 min

    return () => clearInterval(interval); // cleanup function ka type return hota hai
  }, [exams]);
  //---

  return (
    //step: A1,  aim: edit form rendering,  click a link jo "examTrackRoute.jsx" k ander hai wo ak "EditUpdate.jsx" file ko render kr dega,
    <>
      <Nav />
      <div className="m-5  md:m-15  p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  rounded-md ">
        {exams.map((exam) => (
          <Link to={`/exam/${exam._id}/edit`} key={exam._id}>
            <div className="bg-linear-to-r/oklab  from-indigo-500 to-teal-400 rounded-xl p-5 w-full card-wrapper">
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
                      typeof timeLeft[exam._id]?.pre === "string"
                        ? "text-red-700 font-bold" // agar Exam Over hai
                        : "text-yellow-300 font-semibold" // normal countdown
                    }
                  >
                    Pre:{" "}
                    {typeof timeLeft[exam._id]?.pre === "string"
                      ? timeLeft[exam._id]?.pre // "Exam Over"
                      : `${timeLeft[exam._id]?.pre.days}day ${
                          timeLeft[exam._id]?.pre.hours
                        }hr`}
                  </p>

                  <p className="text-yellow-300 font-semibold">
                    Mains:{" "}
                    {typeof timeLeft[exam._id]?.mains === "string"
                      ? timeLeft[exam._id]?.mains // "Exam Over"
                      : `${timeLeft[exam._id]?.mains.days}day ${
                          timeLeft[exam._id]?.mains.hours
                        }hr`}
                  </p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
// condition ? valueIfTrue : valueIfFalse
