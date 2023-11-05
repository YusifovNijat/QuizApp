import { fetchQuizQuestions } from './API';
import QuestionCard from './components/QuestionCard';
import { QuestionsState, Difficulty } from './API';
import './components/style.css';
import React, { useState } from 'react';



export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log();


  const startQuiz = async () => {
      setLoading(true);
      setGameOver(false);

      const newquestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );

      setQuestions(newquestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
  }

  

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
      if(!gameOver){
        const answer = e.currentTarget.value;
        const correct = questions[number].correct_answer === answer;
        if(correct){
          setScore(prev=> prev + 1); 
        } 
        const answerObject = {
          question: questions[number].question,
          answer,
          correct,
          correctAnswer: questions[number].correct_answer,
        };
        setUserAnswers(prev => [...prev, answerObject]);
      }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true);
    } else {
      setNumber(nextQuestion)
    }


  }


  return (
    <div className="App">
      <h1>QUIZ GAME</h1>
      {gameOver ? (
        <button className="start" onClick={startQuiz}>Start</button>
      ) : null}
      {!gameOver ? <p className='score'>Score: {score}</p> : null}
      {loading ? <div className='loading'> <p>Loading ...</p> </div>: null}
      {!loading && !gameOver && (
        <QuestionCard
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers[number] ? userAnswers[number].answer : ''}
          callback={checkAnswer}
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          correctAnswer={questions[number].correct_answer} // Provide the correct answer here
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
      <div className="btn-container">
      <button className='next' onClick={nextQuestion}>
      Next
    </button>
      </div>
      ): null}
      {userAnswers.length === number + 1 && number === TOTAL_QUESTIONS - 1 ? (
      <div className="btn-container">
        <button className='next' onClick={startQuiz}>
            Restart
        </button>
      </div>
      ): null}
    </div>
  );
}

export default App;





