import { Link } from "react-router-dom";
import Feed from "../components/Feed";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
const Detail = () => {
  return (
    <>
    
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
        <Link to="/" className="flex gap-2 text-sm">
          <span className="text-blue-900 font-bold">{`<`}</span>
          <span className="text-gray-600">뒤로가기</span>
        </Link>
        <div className="flex gap-2">
          <Link to="/feeds/update/1" className="bg-yellow-500 text-white px-4 py-2 rounded-md ">
          수정  
          </Link>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md ">
              삭제
            </button>
        </div>
      </div>
        <Feed />
      </div>



   <div className="flex flex-col gap-8 bg-white p-6 rounded-lg">
    <h3 className="text-blue-950 font-semibold">12 Comments</h3>
    <Comment/>
    <Comment/>
    <Comment/>
    <Comment/>
   </div>

<CommentForm/>
    </>
  );
};

export default Detail;
