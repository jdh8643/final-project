// import { useContext } from "react";
import { Outlet } from "react-router-dom";
// import { UserContext } from "../context/UserContext";


const ProtectedRoute = () => {
// const {user} = useContext(UserContext);
// if (!user) {
//     return <Navigate to="/login" />;
// }
  return (
    <>
    <Outlet/>
    </>
  )
} 

export default ProtectedRoute