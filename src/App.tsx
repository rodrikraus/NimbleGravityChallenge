import { useState } from "react";
import { getCandidateByEmail } from "./api/api";
import type { Candidate } from "./types/types";
import JobList from "./components/JobList";

export default function App() {
  const [email, setEmail] = useState("");
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchCandidate = async () => {
    if (!email) {
      setError("Please enter an email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getCandidateByEmail(email);
      setCandidate(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // screen 1 — email input
  if (!candidate) {
    return (
      <div className="email-box">
        <h1 className="title">Nimble Gravity Challenge</h1>

        <input
          className="input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFetchCandidate();
            }
          }}
        />

        <button
          className="button"
          onClick={handleFetchCandidate}
          disabled={loading}
        >
          {loading ? "Loading..." : "Start"}
        </button>

        {error && <p className="message error">{error}</p>}
      </div>
    );
  }

  // screen 2 — job list
  return (
    <div className="container">
      <h2 className="title">
        Welcome {candidate.firstName} {candidate.lastName}
      </h2>

      <JobList candidate={candidate} />
    </div>
  );
}