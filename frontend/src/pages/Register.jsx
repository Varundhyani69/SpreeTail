import { useState } from "react";
import api from "../api/axios";

export default function Register(){

  const [name,setName] =
    useState("");

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  async function register(){

    await api.post(
      "/auth/register",
      {
        name,
        email,
        password
      }
    );

    window.location =
      "/login";

  }

  return(

    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white shadow rounded-lg p-8 w-96">

        <h1 className="text-2xl font-semibold mb-6">
          Register
        </h1>

        <input
          className="border w-full p-2 mb-3 rounded"
          placeholder="Name"
          onChange={e=>
            setName(
              e.target.value
            )
          }
        />

        <input
          className="border w-full p-2 mb-3 rounded"
          placeholder="Email"
          onChange={e=>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          className="border w-full p-2 mb-4 rounded"
          placeholder="Password"
          onChange={e=>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={register}
          className="w-full bg-black text-white p-2 rounded"
        >
          Register
        </button>

      </div>

    </div>

  );

}