import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Login(){

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  const [loading,setLoading] =
    useState(false);

  const [error,setError] =
    useState("");

  async function login(){

    try{

      setLoading(true);
      setError("");

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

      window.location = "/";

    }catch(err){

      setError(
        err.response?.data?.error
        || "Login failed"
      );

    }finally{

      setLoading(false);

    }

  }

  return(

    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h1 className="text-3xl font-semibold mb-5">
          Login
        </h1>

        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded mb-4 text-sm">

          <strong>
            Demo Notice
          </strong>

          <div className="mt-1">
            Hosted on Render Free Tier.
            First request may take 30-60 seconds.
          </div>

          <div className="mt-2">
            <strong>
              Demo Account
            </strong>
            <br />
            Email: priya/rohan/meera/aisha@test.com
            <br />
            Password: 123456
          </div>

        </div>

        {error && (

          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">
            {error}
          </div>

        )}

        <input
          className="border p-3 w-full mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={e=>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          className="border p-3 w-full mb-4 rounded"
          placeholder="Password"
          value={password}
          onChange={e=>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          disabled={loading}
          onClick={login}
          className="
            bg-black
            text-white
            w-full
            py-3
            rounded
            disabled:opacity-50
          "
        >
          {
            loading
              ? "Signing In..."
              : "Login"
          }
        </button>

        {loading && (

          <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">

            <div
              className="
                w-4
                h-4
                border-2
                border-gray-300
                border-t-black
                rounded-full
                animate-spin
              "
            />

            Authenticating...

          </div>

        )}

        <p className="mt-5 text-center">

          Don't have an account?

          <Link
            to="/register"
            className="underline ml-1"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );
}