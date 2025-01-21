import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";
import Detail from "./pages/Detail";
import UpdatePage from "./pages/UpdatePage";
import CreatePage from "./pages/CreatePage";
import Layout from "./components/Layout";
import { AuthProvider } from "./providers/AuthProvider";

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/feeds/:id" element={<Detail />} />
            <Route path="/update/:id" element={<UpdatePage />} />
            <Route path="/create" element={<CreatePage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
