
import { useState } from "react";
import type { Job, Candidate } from "../types/types";
import { applyToJob } from "../api/api";

interface Props {
  job: Job;
  candidate: Candidate;
}

export default function JobItem({ job, candidate }: Props) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage("");

      await applyToJob({
        uuid: candidate.uuid,
        candidateId: candidate.candidateId,
        jobId: job.id,
        repoUrl,
      });

      setMessage("✅ Application sent!");
    } catch (err: any) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="job-card">
      <div className="job-title">{job.title}</div>

      <input
        className="input"
        type="text"
        placeholder="https://github.com/your-user/your-repo"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <button
        className="button"
        onClick={handleSubmit}
        disabled={loading || !repoUrl}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {message && (
        <p
          className={`message ${
            message.includes("✅") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}