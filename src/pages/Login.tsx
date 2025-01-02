import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { UserContext } from "../App"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault()
   
    setUser(email)
    navigate('/')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            로그인
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            계정이 없으신가요?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
