import { Link, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import { useQuery } from "@tanstack/react-query";
import { getFeedById } from "../api/feedApi";
import Feed from "../components/Feed";
import { getCommentsByFeedId } from "../api/commentApi";
import { getUpvotesCount } from "../api/upvoteApi";

const Detail = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["feeds", id],
    queryFn: () => {
      if (!id) throw new Error("id가 없습니다.");
      return getFeedById(id);
    },
  });

  const { data: comments, isLoading: isCommentsLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => {
      if (!id) throw new Error("id가 없습니다.");
      return getCommentsByFeedId(id);
    },
  });

  const { data: upvotesCount, isLoading: isUpvotesLoading } = useQuery({
    queryKey: ["upvotes", id],
    queryFn: () => {
      if (!id) throw new Error("id가 없습니다.");
      return getUpvotesCount(id);
    },
  });

  if (isLoading || isCommentsLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  const commentsList = Array.isArray(comments) ? comments : [];

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex gap-2 text-sm">
            <span className="text-blue-900 font-bold">{`<`}</span>
            <span className="text-gray-600">뒤로가기</span>
          </Link>
          <div className="flex gap-2">
            <Link
              to="/update/1"
              className="bg-yellow-500 text-white px-4 py-2 rounded-md "
            >
              수정
            </Link>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md ">
              삭제
            </button>
          </div>
        </div>
        <Feed feed={data} />
      </div>

      <div className="flex flex-col gap-8 bg-white p-6 rounded-lg">
        <h3 className="text-blue-950 font-semibold">
          {isCommentsLoading ? (
            <div className="animate-pulse w-4 h-4 bg-slate-200 rounded-full"></div>
          ) : (
            commentsList.length
          )}
          Comments
        </h3>
        {commentsList.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>

      <CommentForm />
    </>
  );
};

export default Detail;
