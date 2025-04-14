import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Result = () => {
  const { user, questions, answers, score } = useQuiz();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="bg-white text-gray-800 p-6 rounded-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Admission No:</strong> {user.admissionNo}</p>
        <p className="mt-4 text-xl font-semibold">Score: {score}/{questions.length}</p>

        <div className="mt-6">
          <h3 className="font-bold mb-2">Answers Review:</h3>
          {questions.map((q, i) => (
            <div key={i} className="mb-3 p-3 border rounded bg-gray-50">
              <p className="font-medium">{q.question}</p>
              <p className="text-sm">
                Your answer:{" "}
                {answers[i] ? (
                  <span className="text-green-600 font-semibold">
                    {q.answer} <FaCheckCircle className="inline" />
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    {q.options.find((opt) => opt !== q.answer)} <FaTimesCircle className="inline" />
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-500">Correct answer: {q.answer}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/topic")}
          className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
