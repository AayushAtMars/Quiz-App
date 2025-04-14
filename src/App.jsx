import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import TopicSelection from "./pages/TopicSelection";
import { useQuiz } from "./context/QuizContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = useQuiz();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic" element={user ? <TopicSelection /> : <Navigate to="/" />} />
        <Route path="/quiz" element={user ? <Quiz /> : <Navigate to="/" />} />
        <Route path="/result" element={user ? <Result /> : <Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
