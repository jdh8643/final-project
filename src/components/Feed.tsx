import { Link } from "react-router-dom";
import { FaAngleUp, FaCommentDots } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { getUpvotesCount } from "../api/upvoteApi";
import { getCommentsCount } from "../api/commentApi";


interface feedProps{
  id:string;
  title:string
  content:string
  created_at:string
  user_id:string
}

const Feed = ({feed}:{feed:feedProps}) => {

const {data:commentsCount, isLoading:isCommentsLoading} = useQuery({
  queryKey:['comments', feed.id],
  queryFn:()=> getCommentsCount(feed.id)
});
const {data:upvotesCount, isLoading:isUpvotesLoading} = useQuery({
  queryKey:['upvotes', feed.id],
  queryFn:()=> getUpvotesCount(feed.id)
});

  return (
    <Link
      to={`/feeds/${feed.id}`}
      className="flex justify-between bg-white shadow-md p-6 rounded-lg"
    >
      <div>
        <button className="p-3 bg-gray-100 rounded-lg text-sm flex-col items-center gap-1 text-bulue-950">
          <FaAngleUp className="text-xs text-center font-bold" />
          <div className="font-bold">{isUpvotesLoading ? '...' : upvotesCount}</div>
        </button>
      </div>
      <div className="flex-1 px-10 min-w-0 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-blue-950 text-xl font-bold">{feed.title}</h2>
          <p className="text-gray-600 truncate text-md">{feed.content}</p>
        </div>
        <p className="text-gray-600 text-xs text-right">"작성일:" {new Date(feed.created_at).toLocaleDateString()}</p>
      </div>
      <div className="flex items-center gap-1 p-3 text-gray-600">
      <FaCommentDots className="text-gray-500 font-bold text-xl" />
        <div className="font-bold">{isCommentsLoading ? '...' : commentsCount}</div>
      </div>
    </Link>
  );
};

export default Feed;
