import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { toast } from "react-toastify";
import { FaBookOpen } from "react-icons/fa";

const topics = [
  "JavaScript",
  "React",
  "Python",
  "Data Structures",
  "Algorithms",
  "Web Development",
  "Machine Learning",
  "Database Systems"
];

const TopicSelection = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [questionCount, setQuestionCount] = useState(5);
  const navigate = useNavigate();
  const { setQuizConfig } = useQuiz();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (questionCount < 1 || questionCount > 20) {
      toast.error("Please select between 1 and 20 questions!");
      return;
    }

    setQuizConfig({
      topic: selectedTopic,
      questionCount: questionCount
    });
    
    toast.success("Quiz configured! Starting quiz...");
    navigate("/quiz");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-[90%] max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <FaBookOpen />Choose Your Topic
        </h1>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Quiz Topic</label>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Number of Questions</label>
          <input
            type="number"
            min="1"
            max="20"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded"
          />
          <p className="text-sm text-gray-500 mt-1">Choose between 1 and 20 questions</p>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-600 hover:bg-slate-700 text-white py-2 rounded transition-all"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default TopicSelection;