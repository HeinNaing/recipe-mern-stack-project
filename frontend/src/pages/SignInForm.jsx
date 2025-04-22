import axios from "axios";
import React, { useState } from "react";
import showErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const login = async (e) => {
    try {
      e.preventDefault();
      let data = {
        email,
        password,
      };
      let result = await axios.post("/api/user/login", data, {
        withCredentials: true,
      });
      if (result.status === 200) {
        navigate("/");
      }
      console.log(result);
    } catch (e) {
      console.log(e.response.data.error);
      setError(e.response.data.error);
    }
  };
  return (
    <div className=" min-h-[700px] flex flex-col justify-center items-center">
      <h1 className="text-primary text-2xl text-center font-bold"> Login</h1>
      <form onSubmit={login}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xl max-w-md border p-4 gap-5">
          <legend className="fieldset-legend text-[14px]">Login</legend>

          <label className="label text-[16px]">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
            placeholder="Email"
          />

          <label className="label text-[16px]">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full"
            placeholder="Password"
          />

          {error && showErrorMessage(error)}

          <button className="btn btn-primary mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
}
