import { Outlet, Link} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import supabase from "../utils/supabase";

const Layout = () => {
  const { user, setUser } = useContext(UserContext);


  const handleLogout = async() => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div>
      <header>
        <nav className="flex justify-between items-center p-4  text-black">
          <Link to="/" className="flex items-center">
            <img src="/logoipsum-logo.svg" alt="Logo" className="h-8 w-8 mr-2" />
          </Link>
          
          <div className="flex space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="hover:text-gray-300">로그인</Link>
                <Link to="/signup" className="hover:text-gray-300">회원가입</Link>
              </>
            ) : (
              <>
                <span className="hover:text-gray-300">{user}</span>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-300"
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;