// JobsPageClient.tsx
"use client";

import { useState } from 'react';
import Hero from "@/app/components/Hero";
import Jobs from "@/app/components/Jobs";
import type { Job } from "@/models/Job";

export default function JobsPageClient({ jobs }: { jobs: Job[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Jobs header="Available Jobs" jobs={filteredJobs} />
    </>
  );
}
