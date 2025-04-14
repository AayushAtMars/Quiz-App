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
    if (!questions || questions.length === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (currentQ < questions.length) {
            setTimeout(() => {
              if (currentQ === questions.length - 1) {
                finishQuiz();
              } else {
                handleNext();
              }
            }, 0);
          }
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQ, questions]);

  const handleNext = () => {
    setAnswers((prev) => [
      ...prev,
      selected === questions[currentQ]?.answer ? 1 : 0,
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
    if (!questions || !questions[currentQ]) return;

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900 text-white text-xl">
        Fetching Questions...
      </div>
    );
  }

  if (!questions || questions.length === 0) return null;

  const q = questions[currentQ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-xl relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
        >
          <div 
            className="absolute top-0 left-0 h-1 bg-slate-600 transition-all rounded-xl"
            style={{ 
              width: `${(timer / 60) * 100}%`,
              transition: 'width 950ms cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'width'
            }}
          />
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Question {currentQ + 1}/{questions.length}
              </h2>
              <span className="text-xl font-bold text-gray-800">{timer}s</span>
            </div>
            <p className="text-gray-700 text-lg">{q.question}</p>
          </div>

          <div className="space-y-3 mb-6">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(opt)}
                className={`w-full p-4 text-left rounded-lg transition-all duration-300 ${selected === opt
                  ? "bg-slate-600 text-white"
                  : "bg-slate-100 hover:bg-gray-200 text-gray-700"}`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              disabled={!selected}
              onClick={() => {
                if (currentQ === questions.length - 1) {
                  finishQuiz();
                } else {
                  handleNext();
                }
              }}
              className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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
