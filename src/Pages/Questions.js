import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Qus from "./Qus";
import { useLocation } from "react-router-dom";

function Question() {
  const [question, setQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  const navigate = useNavigate();
  const playAgain = () => {
    navigate("/");
  };

  const location = useLocation();

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=${location.state.amount}&category=${location.state.category}&difficulty=${location.state.difficulty}&type=multiple`
      )
      .then((res) => res.data)
      .then((data) => {
        const questions = data.results.map((question) => ({
          ...question,
          answers: [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }));
        setQuestion(questions);
      });
  }, []);
  const handleAnswer = (answer) => {
    if (!showAnswers)
      if (answer === question[currentIndex].correct_answer) {
        setScore(score + 1);
      } else {
        setScore(score - 1);
      }
    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setShowAnswers(false);
  };

  return question.length > 0 ? (
    <div>
      {currentIndex >= question.length ? (
        <div className="back">
          {(() => {
            if (score === question.length) {
              return (
                <div className="bo">
                  <h1 className="your">Your score</h1>
                  <h1 className="score">{score}</h1>
                  <span className="name">
                    WOW! You are a Genius {location.state.username}
                  </span>
                  <div className="again">
                    <button className="pla" onClick={playAgain}>
                      Play Again
                    </button>
                  </div>
                </div>
              );
            } else if (score >= question.length / 1.25) {
              return (
                <div className="bo">
                  <h1 className="your">Your score</h1>
                  <h1 className="score">{score}</h1>
                  <span className="name">
                    Great Job {location.state.username}
                  </span>
                  <div className="again">
                    <button className="pla" onClick={playAgain}>
                      Play Again
                    </button>
                  </div>
                </div>
              );
            } else if (score >= question.length / 2) {
              return (
                <div className="bo">
                  <h1 className="your">Your score</h1>
                  <h1 className="score">{score}</h1>
                  <span className="name">
                    You could do better {location.state.username}
                  </span>
                  <div className="again">
                    <button className="pla" onClick={playAgain}>
                      Play Again
                    </button>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="bo">
                  <h1 className="your">Your score</h1>
                  <h1 className="score">{score}</h1>
                  <span className="name">
                    Oh No! You need some groundwork {location.state.username}
                  </span>
                  <div className="again">
                    <button className="pla" onClick={playAgain}>
                      Play Again
                    </button>
                  </div>
                </div>
              );
            }
          })()}
        </div>
      ) : (
        <Qus
          handleAnswer={handleAnswer}
          showAnswers={showAnswers}
          handleNextQuestion={handleNextQuestion}
          data={question[currentIndex]}
        />
      )}
    </div>
  ) : (
    <div className="load">loading...</div>
  );
}

export default Question;
