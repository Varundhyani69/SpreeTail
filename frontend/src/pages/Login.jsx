import { useState } from "react";
import api from "../api/axios";

export default function Login(){

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  async function login(){

    const res =
      await api.post(
        "/auth/login",
        {
          email,
          password
        }
      );

    localStorage.setItem(
      "token",
      res.data.token
    );

    window.location="/";
  }

  return(
    <div className="h-screen flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl shadow w-96">

        <h1 className="text-2xl mb-4">
          Login
        </h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={e=>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={e=>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={login}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}