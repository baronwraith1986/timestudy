"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Dashboard() {
  const supabase = createClientComponentClient();
  const [entries, setEntries] = useState<any[]>([]);
  const [activity, setActivity] = useState("");
  const [hours, setHours] = useState("");
  const [location, setLocation] = useState("Remote");
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  // Role → Activities mapping
  const roleActivities: Record<string, string[]> = {
    "Licensing": [
      "Licensing Home Visits",
      "Licensing Paperwork Processing",
      "Family Recruitment Activities",
      "Compliance Audits",
      "Administrative / Clerical Tasks"
    ],
    "Case Manager": [
      "Case Management Visits",
      "Case Management Documentation",
      "Court Preparation",
      "Travel",
      "Crisis Response",
      "Phone Calls (Case Related)"
    ],
    "Adoption Specialist": [
      "Adoption Casework",
      "Court Preparation",
      "Family Recruitment Activities",
      "Phone Calls (Case Related)"
    ],
    "Therapist": [
      "Therapy Sessions",
      "Case Management Documentation",
      "Crisis Response"
    ],
    "Team Lead – Licensing": [
      "Licensing Home Visits",
      "Licensing Paperwork Processing",
      "Family Recruitment Activities",
      "Compliance Audits",
      "Administrative / Clerical Tasks",
      "Supervision & Quality Control",
      "Staff Meetings",
      "Training (Delivering)"
    ],
    "Team Lead – Case Management": [
      "Case Management Visits",
      "Case Management Documentation",
      "Court Preparation",
      "Travel",
      "Crisis Response",
      "Phone Calls (Case Related)",
      "Supervision & Quality Control",
      "Staff Meetings",
      "Training (Delivering)"
    ],
    "Team Lead – Adoptions": [
      "Adoption Casework",
      "Court Preparation",
      "Family Recruitment Activities",
      "Phone Calls (Case Related)",
      "Supervision & Quality Control",
      "Staff Meetings",
      "Training (Delivering)"
    ],
    "Administrative Assistant": [
      "Administrative / Clerical Tasks",
      "Email Communication",
      "Compliance Audits"
    ],
    "Program Director": [
      "Staff Meetings",
      "Training (Attending)",
      "Training (Delivering)",
      "Administrative / Clerical Tasks"
    ],
    "Assistant State Director": [
      "Staff Meetings",
      "Training (Attending)",
      "Training (Delivering)",
      "Administrative / Clerical Tasks"
    ],
    "State Director": [
      "Staff Meetings",
      "Training (Attending)",
      "Training (Delivering)",
      "Administrative / Clerical Tasks"
    ]
  };

  useEffect(() => {
    fetchProfileAndEntries();
  }, []);

  async function fetchProfileAndEntries() {
    setLoading(true);

    // Get current user's profile
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role) setRole(profile.role);

    // Get their time entries
    const { data: entriesData } = await supabase
      .from("time_entries")
      .select("*")
      .order("date", { ascending: false });

    setEntries(entriesData || []);
    setLoading(false);
  }

  async function addEntry(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("time_entries").insert([
      {
        activity,
        hours: parseFloat(hours),
        location,
        date: new Date().toISOString()
      }
    ]);

    if (!error) {
      setActivity("");
      setHours("");
      fetchProfileAndEntries();
    }
  }

  const totalHours = entries.reduce((sum, e) => sum + (e.hours || 0), 0);
  const remoteHours = entries.filter(e => e.location === "Remote").reduce((sum, e) => sum + e.hours, 0);
  const officeHours = entries.filter(e => e.location === "Office").reduce((sum, e) => sum + e.hours, 0);
  const fieldHours = entries.filter(e => e.location === "Field").reduce((sum, e) => sum + e.hours, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-6">
        Dashboard {role && `- ${role}`}
      </h1>

      {/* Add Entry Form */}
      <form onSubmit={addEntry} className="mb-8 flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow">
        {/* Activity Dropdown */}
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
          className="flex-1 rounded border px-3 py-2"
        >
          <option value="">Select Activity</option>
          {role && roleActivities[role]?.map((act) => (
            <option key={act} value={act}>
              {act}
            </option>
          ))}
        </select>

        {/* Hours Input */}
        <input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          required
          step="0.25"
          className="w-24 rounded border px-3 py-2"
        />

        {/* Location Dropdown */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded border px-3 py-2"
        >
          <option>Remote</option>
          <option>Office</option>
          <option>Field</option>
        </select>

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Add
        </button>
      </form>

      {/* Metrics */}
      <div className="mb-8 grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-lg font-bold">{totalHours}</p>
          <p className="text-sm text-gray-500">Total Hours</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-lg font-bold">{remoteHours}</p>
          <p className="text-sm text-gray-500">Remote Hours</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-lg font-bold">{officeHours}</p>
          <p className="text-sm text-gray-500">Office Hours</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-lg font-bold">{fieldHours}</p>
          <p className="text-sm text-gray-500">Field Hours</p>
        </div>
      </div>

      {/* Entries Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Activity</th>
              <th className="p-2 text-left">Hours</th>
              <th className="p-2 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-t">
                <td className="p-2">{new Date(entry.date).toLocaleDateString()}</td>
                <td className="p-2">{entry.activity}</td>
                <td className="p-2">{entry.hours}</td>
                <td className="p-2">{entry.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
