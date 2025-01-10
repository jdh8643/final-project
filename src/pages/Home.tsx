import { Link } from "react-router-dom"
import Feed from "../components/Feed"


const Home = () => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">글 목록</h1>
        <Link to="/create" className="bg-blue-500 text-white rounded-md px-4 py-2">글쓰기</Link>
      </div>

      <div className="flex flex-col gap-4">
      <Feed />
      <Feed />
      <Feed />
      </div>
    </>
  )
}

export default Home