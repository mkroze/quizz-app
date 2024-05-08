import React, { useState, useRef } from "react";
import "./Quizz.css";
import { data } from "../../assets/Assets/data";
const Quizz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];
  console.log(question);
  const checkAnswer = (element, answer) => {
    if (!lock) {
      if (question.ans === answer) {
        element.target.classList.add("correct");
        setLock(true);
        setScore((previousScore) => previousScore + 1);
      } else {
        element.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index == data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }
  return (
    <div className="container">
      <h1>Quizz App</h1>
      <hr />
      {result ? (
        <><h2>You scored {score} out of {data.length}</h2>
        <button onClick={()=>reset()}>Resrt</button></>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAnswer(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAnswer(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAnswer(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAnswer(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={() => next()}>Next question</button>
          <div className="index">
            {index + 1}of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quizz;
