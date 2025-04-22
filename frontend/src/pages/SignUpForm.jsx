import axios from "../helpers/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import showErrorMessage from "../components/ErrorMessage";
export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const register = async (e) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      setError(null);
      let data = {
        username: name,
        email,
        password,
      };
      let result = await axios.post("/api/user/register", data, {
        withCredentials: true,
      });
      if (result.status === 200) {
        navigate("/");
      }
      console.log(result);
    } catch (e) {
      setError(e.response.data.error);
    }
  };

  //password handle
  const handlePassword = (e) => {
    let newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword, confirmPassword);
  };
  const handleConfirmPassword = (e) => {
    let newPassword = e.target.value;
    setConfirmPassword(newPassword);
    validatePassword(newPassword, password);
  };
  const validatePassword = (password, confirmPassword) => {
    if (password && confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  return (
    <div className=" min-h-[700px] flex flex-col justify-center items-center">
      <h1 className="text-primary text-2xl text-center font-bold">
        Register Form
      </h1>
      <form onSubmit={register}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xl max-w-md border p-4 gap-5">
          <legend className="fieldset-legend text-[14px]">Register Form</legend>

          <label className="label text-[16px]">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            required
            className="input w-full"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label text-[16px]">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            required
            className="input w-full"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label text-[16px]">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            required
            className="input w-full"
            placeholder="Enter your password"
            value={password}
            onChange={handlePassword}
          />

          <label className="label text-[16px]">Confirm Password</label>
          <input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            required
            className="input w-full"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
          {error && showErrorMessage(error)}

          <button className="btn btn-primary mt-4">Create Account</button>
        </fieldset>
      </form>
    </div>
  );
}
