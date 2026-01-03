import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import FreeCodeCampPage from "./pages/FreeCodeCampPage";
import AboutPage from "./pages/AboutPage";
import GnewsPage from "./pages/GnewsPage";
import { GithubBlogPage } from "./pages/GithubBlogPage";
import { TopNewsPage } from "./pages/TopNewsPage";
import DevTOPage from "./pages/DevToPage";

const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/freecodecamp" element={<FreeCodeCampPage />} />
        <Route path="/gnews" element={<GnewsPage />} />
        <Route path="/githubblog" element={<GithubBlogPage />} />
        <Route path="/topnews" element={<TopNewsPage />} />
        <Route path="/devto" element={<DevTOPage />} />
      </Routes>
    </Router>
  );
};

export default App;
