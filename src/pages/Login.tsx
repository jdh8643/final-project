import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from "../utils/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (password.length < 6) {
      alert("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    // 1. supabase 로그인

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
      return;
    }
    console.log(data);
    alert("로그인 완료");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">회원가입</h1>
      <form className="flex flex-col gap-4 w-80" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm">
            이메일
          </label>
          <input
            className="border border-gray-300 rounded-md p-2"
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={onEmailChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="border border-gray-300 rounded-md p-2"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={onPasswordChange}
            required
          />
        </div>

        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-md"
          type="submit"
        >
          로그인하기
        </button>
        <Link
          className="py-2 px-4 text-center text-blue-500 border border-blue-500 rounded-md"
          to="/signup"
        >
          회원가입하러 가기
        </Link>
      </form>
    </div>
  );
};


export default Login


