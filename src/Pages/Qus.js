import React from "react";

export default function Qus({
  handleAnswer,
  handleNextQuestion,
  showAnswers,
  data: { question, correct_answer, answers },
}) {
  return (
    <div className="back">
      <div className="box">
        <h1
          className="question"
          dangerouslySetInnerHTML={{ __html: question }}
        />
        <div className="click">
          {answers.map((answer, idx) => {
            const specialClassName = showAnswers
              ? answer === correct_answer
                ? "green-button"
                : "red-button"
              : "";
            return (
              <button
                key={idx}
                className={`opt ${specialClassName}`}
                onClick={() => handleAnswer(answer)}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            );
          })}
        </div>
        <div>
          {showAnswers && (
            <button className="sub" onClick={handleNextQuestion}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
