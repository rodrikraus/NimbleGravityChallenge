import { useEffect, useState } from "react";
import { getJobs } from "../api/api";
import type { Job, Candidate } from "../types/types";
import JobItem from "./JobItem";

interface Props {
  candidate: Candidate;
}

export default function JobList({ candidate }: Props) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobItem
          key={job.id}
          job={job}
          candidate={candidate}
        />
      ))}
    </div>
  );
}