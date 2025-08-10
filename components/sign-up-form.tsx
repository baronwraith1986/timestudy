"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SignUpForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [state, setState] = useState("");
  const [office, setOffice] = useState("");
  const [officesList, setOfficesList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch offices dynamically when state changes
  useEffect(() => {
    if (!state) return;
    const fetchOffices = async () => {
      const { data, error } = await supabase
        .from("offices")
        .select("name")
        .eq("state", state);

      if (!error && data) {
        setOfficesList(data.map((o) => o.name));
      }
    };
    fetchOffices();
  }, [state, supabase]);

  const handleSignUp = async () => {
    setErrorMsg("");
    if (!email || !password || !role || !state || !office) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        role,
        state,
        office,
      });
    }

    setLoading(false);
    router.push("/sign-up-success");
  };

  return (
    <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full border border-border">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">
        (Unofficial) Necco Time Studies
      </h1>
      <p className="text-center text-sm text-muted-foreground mb-6">
        Because our grandparents used Excel.
      </p>

      {errorMsg && (
        <div className="bg-destructive text-destructive-foreground p-2 rounded mb-4 text-sm">
          {errorMsg}
        </div>
      )}

      <input
        type="email"
        placeholder="Necco Email"
        className="w-full p-3 border border-border rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border border-border rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        className="w-full p-3 border border-border rounded mb-4"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">Select your role</option>
        <option value="Licensing - Ongoing">Licensing - Ongoing</option>
        <option value="Licensing - Initial">Licensing - Initial</option>
        <option value="Case Manager">Case Manager</option>
        <option value="Adoption Specialist">Adoption Specialist</option>
        <option value="Therapist">Therapist</option>
        <option value="Team Lead - Licensing">Team Lead - Licensing</option>
        <option value="Team Lead - Case Management">Team Lead - Case Management</option>
        <option value="Administrative Assistant">Administrative Assistant</option>
        <option value="Program Director">Program Director</option>
        <option value="Assistant State Director">Assistant State Director</option>
        <option value="State Director">State Director</option>
      </select>

      <select
        className="w-full p-3 border border-border rounded mb-4"
        value={state}
        onChange={(e) => setState(e.target.value)}
      >
        <option value="">Select your state</option>
        <option value="Kentucky">Kentucky</option>
        <option value="West Virginia">West Virginia</option>
        <option value="Ohio">Ohio</option>
        <option value="Georgia">Georgia</option>
      </select>

      <select
        className="w-full p-3 border border-border rounded mb-6"
        value={office}
        onChange={(e) => setOffice(e.target.value)}
        disabled={!state}
      >
        <option value="">Select your office</option>
        {officesList.map((officeName) => (
          <option key={officeName} value={officeName}>
            {officeName}
          </option>
        ))}
      </select>

      <Button
        variant="default"
        onClick={handleSignUp}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>
    </div>
  );
}
