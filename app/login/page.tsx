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
      // On successful login, check if the user is an admin
      const user = userCredential.user;
      const token = await user.getIdTokenResult();

      // Redirect the user based on role (admin or user)
      if (token.claims.role === "admin") {
        router.push("/admin/view-bookings"); // Admin can access bookings
      } else {
        router.push("/"); // Regular user redirection to homepage
      }
    } catch (error) {
      setError("Failed to log in. Please check your credentials.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="center-page">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="p-3 border border-gray-300 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="red-button bg-blue-500 text-white p-3 rounded disabled:opacity-50 w-full sm:w-auto"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
          <button
            onClick={() => router.push("/signup")} // Redirect to Sign Up page
            className="red-button bg-green-500 text-white p-3 rounded w-full sm:w-auto"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
