// import React from "react";

// export default function ExamTrack() {
//   return (
//     <h1>Comming</h1>
//   );

// }



import React, { useEffect, useState } from "react";
import axios from "axios"; // 👈 yeh line add karni hai

export default function ExamTrack() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/examTrack") // axios meh .get() use hota hai
      .then((res) => setExams(res.data)) // res.json() ki zaroorat nahi, axios automatic parse karta hai
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {exams.map((exam) => (
        <div key={exam._id} className="card">
          <b>{exam.Exam}</b>
          <br />
          Pre: {new Date(exam.Pre).toLocaleDateString()}
          <br />
          Mains: {new Date(exam.Mains).toLocaleDateString()}
        </div>
      ))}
    </div>
  );
}
