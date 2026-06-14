import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {

  const navigate =
    useNavigate();

  const [name,setName] =
    useState("");

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  async function register() {

    try {

      await api.post(
        "/auth/register",
        {
          name,
          email,
          password
        }
      );

      navigate("/login");

    } catch(err) {

      alert(
        err.response?.data?.error
      );

    }

  }

  return (

    <div className="h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h1 className="text-2xl font-semibold mb-5">
          Register
        </h1>

        <input
          className="border w-full p-2 mb-3"
          placeholder="Name"
          onChange={e=>
            setName(e.target.value)
          }
        />

        <input
          className="border w-full p-2 mb-3"
          placeholder="Email"
          onChange={e=>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="border w-full p-2 mb-4"
          placeholder="Password"
          onChange={e=>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={register}
          className="bg-black text-white w-full py-2 rounded"
        >
          Register
        </button>

      </div>

    </div>
  );
}