import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { getMCQs } from "../utils/gemini";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const Quiz = () => {
    const { setQuestions, setAnswers, setScore, questions, answers } = useQuiz();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMCQs().then((data) => {
      setQuestions(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          handleNext(); // auto skip
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQ]);

  const handleNext = () => {
    setAnswers((prev) => [
      ...prev,
      selected === questions[currentQ].answer ? 1 : 0,
    ]);

    setSelected(null);
    setTimer(60);

    if (currentQ === questions.length - 1) {
      finishQuiz();
    } else {
      setCurrentQ((prev) => prev + 1);
    }
  };

  const finishQuiz = () => {
    const updatedAnswers = [
      ...answers,
      selected === questions[currentQ].answer ? 1 : 0,
    ];
    setAnswers(updatedAnswers);
  
    const totalScore = updatedAnswers.reduce((acc, val) => acc + val, 0);
    setScore(totalScore);
    navigate("/result");
    toast.success("Quiz completed!");
  };
  

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Fetching Questions...
      </div>
    );

  const q = questions[currentQ];

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <AnimatePresence>
        <motion.div
          key={currentQ}
          className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
        >
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">
              Question {currentQ + 1} of {questions.length}
            </h2>
            <p className="text-gray-800 font-medium">{q.question}</p>
          </div>

          <ul className="mb-6">
            {q.options.map((opt, i) => (
              <li key={i}>
                <label className="block py-2 px-3 rounded hover:bg-gray-200 cursor-pointer">
                  <input
                    type="radio"
                    name="option"
                    value={opt}
                    className="mr-2"
                    checked={selected === opt}
                    onChange={() => setSelected(opt)}
                  />
                  {opt}
                </label>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Time left: {timer}s</p>
            <button
              disabled={!selected}
              onClick={() => {
                if (currentQ === questions.length - 1) {
                  finishQuiz();
                } else {
                  handleNext();
                }
              }}
              
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {currentQ === questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
