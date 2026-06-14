import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  async function logout() {

  try {

    await api.post(
      "/auth/logout"
    );

  } catch(err) {

    console.log(err);

  }

  localStorage.removeItem(
    "token"
  );

  navigate(
    "/login"
  );

}

  return (
    <nav className="bg-white border-b">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">

        <div className="flex gap-6">

          <Link to="/">
            Dashboard
          </Link>

          <Link to="/imports">
            Imports
          </Link>

        </div>

        <button
          onClick={logout}
          className="text-red-500"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}