import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import Image from "next/image";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../../styles/SingleJobPage.module.css';

type PageProps = {
  params: {
    jobId: string;
  };
};

export default async function SingleJobPage(props: PageProps) {
  const jobId = props.params.jobId;
  await mongoose.connect(process.env.MONGO_URI as string);
  const jobDoc = await JobModel.findById(jobId);

  return (
    <div className={`container mx-auto bg-white rounded-lg shadow-xl ${styles.container}`}>
      {/* Job Header */}
      <header className={`${styles.header} flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6`}>
      <div className="flex items-center gap-4 flex-1"> {/* Make this div a flex container */}
      <div>
        <h1 className={`${styles.jobTitle} mb-1`}>{jobDoc.title}</h1>
        <p className={`${styles.jobInfo} text-sm`}>
          <span className="capitalize">{jobDoc.remote ? 'Remote' : 'On-site'}</span>
          <span>&middot;</span>
          <span>{jobDoc.city}, {jobDoc.country}</span>
          <span>&middot;</span>
          <span className="capitalize">{jobDoc.type}-time</span>
        </p>
      </div>
      <Image
        src={jobDoc?.jobIcon || "/default-job-icon.png"}
        alt="Job icon"
        width={64}
        height={64}
        className={`${styles.jobIcon}`}
      />
    </div>
      </header>

      {/* Job Description */}
      <section className="text-gray-700 text-base leading-relaxed">
        <p className="whitespace-pre-line">{jobDoc.description}</p>
      </section>

      {/* Contact Section */}
      <aside className={`${styles.contactSection} shadow-inner`}>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Apply by contacting me</h3>
        <div className="flex items-center gap-4">
          <Image
            src={jobDoc.contactPhoto || "/default-contact-photo.png"}
            alt="Contact person"
            width={80}
            height={80}
            className="rounded-full object-cover shadow-sm"
          />
          <div className="text-sm space-y-1">
            <p className={`${styles.contactName}`}>{jobDoc.contactName}</p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-blue-600" />
              <a href={`mailto:${jobDoc.contactEmail}`} className="text-blue-600 hover:underline">
                {jobDoc.contactEmail}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="text-blue-600" />
              <a href={`tel:${jobDoc.contactPhone}`} className="text-blue-600 hover:underline">
                {jobDoc.contactPhone}
              </a>
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
