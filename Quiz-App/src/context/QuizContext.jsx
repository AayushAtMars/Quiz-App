import { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [user, setUser] = useState(null); // name, email, admissionNo
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  return (
    <QuizContext.Provider
      value={{
        user,
        setUser,
        questions,
        setQuestions,
        answers,
        setAnswers,
        score,
        setScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
 