import { userState } from "@/state/userAtom";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userState);
  const router=useRouter()

  const handleLogin = () => {
    if (username === "Guest" && password === "1234") {
      setUser({
        isLoggedIn: true,
      });
      router.replace('/dashboard')
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-semibold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-white text-black p-2 rounded hover:bg-gray-300 focus:outline-none w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
