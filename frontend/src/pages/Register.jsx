import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register(){

  const navigate =
    useNavigate();

  const [name,setName] =
    useState("");

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  const [loading,setLoading] =
    useState(false);

  const [error,setError] =
    useState("");

  async function register(){

    try{

      setLoading(true);
      setError("");

      await api.post(
        "/auth/register",
        {
          name,
          email,
          password
        }
      );

      navigate("/login");

    }catch(err){

      setError(
        err.response?.data?.error
        || "Registration failed"
      );

    }finally{

      setLoading(false);

    }

  }

  return(

    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h1 className="text-3xl font-semibold mb-5">
          Register
        </h1>

        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded mb-4 text-sm">

          <strong>
            Demo Notice
          </strong>

          <div className="mt-1">
            Hosted on Render Free Tier.
            Initial startup may take 30-60 seconds.
          </div>

        </div>

        {error && (

          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">
            {error}
          </div>

        )}

        <input
          className="border w-full p-3 mb-3 rounded"
          placeholder="Name"
          value={name}
          onChange={e=>
            setName(
              e.target.value
            )
          }
        />

        <input
          className="border w-full p-3 mb-3 rounded"
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
          className="border w-full p-3 mb-4 rounded"
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
          onClick={register}
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
              ? "Creating Account..."
              : "Register"
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

            Creating account...

          </div>

        )}

        <p className="mt-5 text-center">

          Already have an account?

          <Link
            to="/login"
            className="underline ml-1"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );
}