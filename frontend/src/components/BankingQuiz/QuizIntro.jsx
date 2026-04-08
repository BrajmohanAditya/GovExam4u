import React from "react";
import { QuizIntroStyle } from "../../pages/BankingQuiz/style";

export default function QuizIntro() {
  return (
    <div className={QuizIntroStyle.wrapper}>
      <div className={QuizIntroStyle.card}>
        <div className={QuizIntroStyle.icon}>🏆</div>

        <h2 className={QuizIntroStyle.heading}>
          Select a Set to Start the Test
        </h2>

        <p className={QuizIntroStyle.description}>
          Choose a set from the left sidebar. Timer will start as soon as you
          select a set.
        </p>

        <div className={QuizIntroStyle.prize}>
          🎉 Winner will be given ₹49 as cash prize
        </div>

        <div className={QuizIntroStyle.time}>⏰ Test Time: 9:00 PM</div>
      </div>
    </div>
  );
}
