import { Link } from "react-router-dom";
import Feed from "../components/Feed";

const Detail = () => {
  return (
    <>
    <div className="max-w-screen-lg mx-auto  min-h-[calc(100vh-100px)] px-10 mb-10">
      <div className="flex flex-col gap-6">
        
      <div className="flex flex-col gap-4">
        <Link to="/" className="text-blue-500">
          뒤로가기
        </Link>
        <Feed />
      </div>

      <div className="flex flex-col gap-8 bg-white p-6 rounded-lg">
        <h3 className="text-blue-950 font-semibold">"4" "Comments"</h3>
        <div className="flex gap-2.5">
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="text-slate-900 font-bold text-sm">
                aaa@aaa.com
              </div>
            </div>
            <div className="text-gray-500">하하하</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 bg-white p-6 rounded-lg">
        <h3 className="text-blue-950 font-semibold">"4" "Comments"</h3>
        <div className="flex gap-2.5">
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="text-slate-900 font-bold text-sm">
                aaa@aaa.com
              </div>
            </div>
            <div className="text-gray-500">하하하</div>
          </div>
        </div>

        
      </div>



      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">댓글 작성</h3>
        <textarea
          placeholder="댓글을 입력하세요"
          className="w-full h-28 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-gray-400"
        ></textarea>
        <div className="flex justify-end mt-3">
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
            작성
          </button>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default Detail;
