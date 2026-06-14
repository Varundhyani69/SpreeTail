export default function Navbar(){

  function logout(){

    localStorage.removeItem(
      "token"
    );

    window.location="/login";

  }

  return(

    <div className="bg-white border-b px-8 py-4 flex justify-between">

      <h1 className="font-semibold">
        Shared Expenses
      </h1>

      <button
        onClick={logout}
        className="text-red-500"
      >
        Logout
      </button>

    </div>

  );
}