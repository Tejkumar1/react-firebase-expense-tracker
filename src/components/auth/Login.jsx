import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isReg, setIsReg] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isReg) {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("Account Created!");
      } else {
        await signInWithEmailAndPassword(auth, email, pass);
        alert("Logged In!");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
          {isReg ? "Create Account" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
            {isReg ? "Register" : "Login"}
          </button>
        </form>

        <p
          className="text-center mt-4 text-sm text-blue-500 cursor-pointer"
          onClick={() => setIsReg(!isReg)}
        >
          {isReg ? "Already have an account? Login" : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
}