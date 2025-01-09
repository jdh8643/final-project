const CommentForm = () => {
  return (
    <div className="flex flex-col gap-4 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-blue-950 font-semibold">댓글 작성</h2>
      <form className="flex flex-col gap-4">
        <textarea className="border border-gray-300 rounded-lg h-[100px] p-3 resize-none" />
        <button 
        type="submit"
        className="self-end bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          작성
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
