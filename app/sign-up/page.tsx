"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignUpPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [office, setOffice] = useState("");
  const [role, setRole] = useState("");
  const [offices, setOffices] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const states = ["Kentucky", "West Virginia", "Ohio", "Georgia"];

  const roles = [
    "Licensing",
    "Case Manager",
    "Adoption Specialist",
    "Therapist",
    "Team Lead – Licensing",
    "Team Lead – Case Management",
    "Team Lead – Adoptions",
    "Administrative Assistant",
    "Program Director",
    "Assistant State Director",
    "State Director",
  ];

  useEffect(() => {
    async function fetchOffices() {
      if (!state) return;
      const { data, error } = await supabase
        .from("offices")
        .select("*")
        .eq("state", state);
      if (!error) setOffices(data || []);
    }
    fetchOffices();
  }, [state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // 1. Create Auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (authError) throw authError;

      // 2. Determine admin status
      const isAdmin = [
        "Program Director",
        "Assistant State Director",
        "State Director",
      ].includes(role);

      // 3. Insert into profiles table
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user?.id,
          email,
          role,
          state,
          office,
          is_admin: isAdmin,
        },
      ]);
      if (profileError) throw profileError;

      router.push("/sign-up-success");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-red-600">Sign Up</h1>
        <p className="text-center text-gray-500">
          Create your account to start tracking.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">Select a state</option>
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Office */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Office
            </label>
            <select
              value={office}
              onChange={(e) => setOffice(e.target.value)}
              required
              disabled={!state}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">Select an office</option>
              {offices.map((o) => (
                <option key={o.id} value={o.name}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">Select a role</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
