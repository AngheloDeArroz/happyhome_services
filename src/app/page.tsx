// Home.tsx
import mongoose from "mongoose";
import JobsPageClient from "./components/JobsPageClient";
import { addOrgAndUserData, JobModel } from "@/models/Job";
import { getUser } from "@workos-inc/authkit-nextjs";

export default async function Home() {
  const { user } = await getUser();
  await mongoose.connect(process.env.MONGO_URI as string);
  const latestJobs = await addOrgAndUserData(
    await JobModel.find({}, {}, { limit: 5, sort: '-createdAt' }),
    user,
  );

  return <JobsPageClient jobs={latestJobs} />;
}
