"use client";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdTokenResult();

      if (token.claims.role === "admin") {
        router.push("/admin/view-bookings");
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("Failed to log in. Please check your credentials.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 min-h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold text-center text-white mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-300 mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 bg-gray-700 text-white"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-gray-300 mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 bg-gray-700 text-white"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 text-white py-3 rounded-md disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="w-full mt-4 bg-gray-600 text-white py-3 rounded-md hover:bg-gray-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
