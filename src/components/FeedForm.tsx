

const FeedForm = ({pageTitle, children}: {pageTitle: string, children: React.ReactNode}) => {

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="">제목</label>
          <input 
          type="text"
          name="title"
          id="title"
          placeholder="제목을 입력해주세요"
          className="border border-gray-300 rounded-lg p-3"
           />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="content">내용</label>
          <textarea 
          name="content"
          id="content"
          placeholder="내용을 입력해주세요"
          className="border border-gray-300 rounded-lg p-3 h-[400px] resize-none"
          />
        </div>
        {children}
      </form>
    </div>
  )
}

export default FeedForm