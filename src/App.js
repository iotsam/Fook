import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import HomePageForm from "./components/HomePageForm/HomePageForm";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import BotNav from "./components/BotNav/BotNav";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import MyPageForm from "./components/MyPageForm/MyPageForm";
import NewPost from "./components/BestRecipeForm/NewPost";
import BestRecipeForm from "./components/BestRecipeForm/BestRecipeForm";
import QuestionForm from "./components/QuestionForm/QuestionForm";
import NewQuestion from "./components/QuestionForm/NewQuestion";
import AIForm from "./components/AIForm/AIForm";
import NoticeForm from "./components/NoticeForm/NoticeForm";
import ViewPost from "./components/BestRecipeForm/ViewPost";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/notice" element={<NoticeForm />} />
        <Route path="/ai" element={<AIForm />} />
        <Route path="/q&a/newpost" element={<NewQuestion />} />
        <Route path="/q&a" element={<QuestionForm />} />
        <Route path="/best/view" element={<ViewPost />} />
        <Route path="/best/newpost" element={<NewPost />} />
        <Route path="/best" element={<BestRecipeForm />} />
        {/* <Route path="/mypage/:name" element={<MyPageForm />} /> */}
        <Route path="/mypage" element={<MyPageForm />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<HomePageForm />} />
      </Routes>
      <BotNav />
    </Router>
  );
}

export default App;
