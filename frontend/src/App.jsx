import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import DetailPage from "./pages/detail";
import CreatePage from "./pages/create";
import Sidebar from "./components/sidebar";
import UndefinedPage from "./pages/undefined";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<DetailPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="*" element={<UndefinedPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
