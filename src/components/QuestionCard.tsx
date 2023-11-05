import React, { useState, useEffect } from 'react';
import './style.css';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: string | undefined;
  questionNumber: number;
  totalQuestions: number;
  correctAnswer: string;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
  correctAnswer,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(false);
  }, [questionNumber]);

  return (
    <div className='quest-card'>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>

      <p className='question' dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) => {
          const isUserAnswer = userAnswer === answer;
          const isCorrectAnswer = answer === correctAnswer;
          const buttonClass = isUserAnswer
            ? isCorrectAnswer
              ? 'green' 
              : 'red' 
            : isClicked && isCorrectAnswer
            ? 'green' 
            : '';

          return (
            <div key={answer} className='answers'>
              <button
                value={answer}
                onClick={(e) => {
                  callback(e);
                  setIsClicked(true);
                }}
                className={buttonClass}
                id="answers"
                disabled={isClicked}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;




