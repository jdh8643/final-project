import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="max-w-screen-lg mx-auto px-10 mt-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
