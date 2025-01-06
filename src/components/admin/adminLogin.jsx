export default function AdminLogin() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-100">
        <div className="flex flex-col bg-white w-1/3 rounded-md py-8 px-4 shadow space-y-5">
          <p className="text-black font-semibold text-2xl">Admin Login</p>
          {/* Email validation */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Email Address</label>
            <input
              type="text"
              className="w-full border-gray-200 border rounded-md px-4 py-2 outline-none focus-within:border-indigo-500"
            />
          </div>

          {/* Password Eye icon */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border-gray-200 border rounded-md px-4 py-2 outline-none focus-within:border-indigo-500"
            />
          </div>

          {/* integrate API */}
          <button className="py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition-all">
            Login
          </button>
        </div>
      </div>
    </>
  );
}
