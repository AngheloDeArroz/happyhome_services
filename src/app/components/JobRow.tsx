'use client';
import TimeAgo from "@/app/components/TimeAgo";
import { Job } from "@/models/Job";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from 'next/navigation'; // Use this to programmatically navigate
import Link from "next/link";
import styles from '@/app/styles/components.module.css'; // Updated import path

export default function JobRow({ jobDoc }: { jobDoc: Job }) {
  const router = useRouter();

  // Function to handle box click and redirect
  const handleRowClick = () => {
    router.push(`/show/${jobDoc._id}`);
  };

  return (
    <div className={styles.jobRow} onClick={handleRowClick} style={{ cursor: 'pointer' }}>
      <div className="absolute cursor-pointer top-4 right-4">
        <FontAwesomeIcon className="size-4 text-gray-300" icon={faHeart} />
      </div>
      <div className={styles.jobRowContent}>
        <div className={`${styles.jobRowIcon} content-center`}>
          <img className="size-12" src={jobDoc?.jobIcon} alt="" />
        </div>
        <div className="grow sm:flex">
          <div className="grow">
            <div>
              <Link href={`/jobs/${jobDoc.orgId}`} className="text-gray-500 text-sm" onClick={(e) => e.stopPropagation()}>
                {jobDoc.orgName || "?"}
              </Link>
            </div>
            <div className={styles.jobRowHeader}>
              <span>{jobDoc.title}</span>
            </div>
            <div className={styles.jobRowDetails}>
              {jobDoc.remote}
              {' '}&middot;{' '}
              {jobDoc.city}, {jobDoc.country}
              {' '}&middot;{' '}
              {jobDoc.type}
              {jobDoc.isAdmin && (
                <>
                  {' '}&middot;{' '}
                  <Link href={'/jobs/edit/' + jobDoc._id} onClick={(e) => e.stopPropagation()}>Edit</Link>
                  {' '}&middot;{' '}
                  <button
                    type="button"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await axios.delete('/api/jobs?id=' + jobDoc._id);
                      window.location.reload();
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {jobDoc.createdAt && (
        <div className={styles.jobRowTime}>
          <TimeAgo createdAt={jobDoc.createdAt} />
        </div>
      )}
    </div>
  );
}
