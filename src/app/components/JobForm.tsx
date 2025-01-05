'use client';
import { saveJobAction } from "@/app/actions/jobActions";
import ImageUpload from "@/app/components/ImageUpload";
import type { Job } from "@/models/Job";
import { faEnvelope, faPhone, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, RadioGroup, TextArea, TextField, Theme } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useState } from "react";
import { batangasCities } from "../lib/batangasCities";
import SelectField from "@/app/components/SelectField";

export default function JobForm({ orgId, jobDoc }: { orgId: string; jobDoc?: Job }) {
  const [cityId, setCityId] = useState(jobDoc?.cityId || 0);
  const [cityName, setCityName] = useState(jobDoc?.city || '');

  async function handleSaveJob(data: FormData) {
    data.set('country', 'Philippines');
    data.set('countryId', 'PH'); // Set a value for countryId (adjust as needed)
    data.set('state', 'Batangas');
    data.set('stateId', 'BAT'); // Set a value for stateId (adjust as needed)
    data.set('city', cityName);
    data.set('cityId', cityId.toString());
    data.set('orgId', orgId);
  
    const jobDoc = await saveJobAction(data);
    redirect(`/jobs/${jobDoc.orgId}`);
  }

  return (
    <Theme>
      <form action={handleSaveJob} className="container mt-6 flex flex-col gap-4">
        {jobDoc && <input type="hidden" name="id" value={jobDoc?._id} />}

        <TextField.Root name="title" placeholder="Service title" defaultValue={jobDoc?.title || ''} />

        <div className="grid sm:grid-cols-3 gap-6 *:grow">
          <div>
            Availability
            <RadioGroup.Root defaultValue={jobDoc?.remote || 'Weekdays'} name="remote">
              <RadioGroup.Item value="flexible">Flexible</RadioGroup.Item>
              <RadioGroup.Item value="weekdays">Weekdays</RadioGroup.Item>
              <RadioGroup.Item value="weekends">Weekends</RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          <div>
            Skill Level/Expertise
            <RadioGroup.Root defaultValue={jobDoc?.type || 'intermediate'} name="type">
              <RadioGroup.Item value="basic">Basic Knowledge</RadioGroup.Item>
              <RadioGroup.Item value="intermediate">Intermediate</RadioGroup.Item>
              <RadioGroup.Item value="advanced">Advanced</RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          <div>
            Salary
            <TextField.Root name="salary" defaultValue={jobDoc?.salary || ''}>
              <TextField.Slot>&#8369;</TextField.Slot>
              <TextField.Slot>/per hour</TextField.Slot>
            </TextField.Root>
          </div>
        </div>

        {/* Three-column layout for location */}
        <div className="grid sm:grid-cols-3 gap-4">
          {/* Fixed country */}
          <div className="flex items-center">
            <span>Philippines</span>
          </div>

          {/* Fixed state */}
          <div className="flex items-center">
            <span>Batangas</span>
          </div>

          {/* Municipality dropdown */}
          <SelectField
            name="city"
            value={cityId}
            onChange={(e: { target: { value: string; }; }) => {
              const selectedCity = batangasCities.find(city => city.id === parseInt(e.target.value));
              setCityId(selectedCity?.id || 0);
              setCityName(selectedCity?.name || '');
            }}
            options={batangasCities}
          />
        </div>

        <div className="sm:flex">
          <div className="w-1/3">
            <h3>Job icon</h3>
            <ImageUpload name="jobIcon" icon={faStar} defaultValue={jobDoc?.jobIcon || ''} />
          </div>
          <div className="grow flex flex-col">
            <h3>Contact person</h3>
            <div className="flex gap-4">
              <div className="w-1/3">
                <ImageUpload name="contactPhoto" icon={faUser} defaultValue={jobDoc?.contactPhoto || ''} />
              </div>
              <div className="flex flex-col grow">
                <TextField.Root
                  placeholder="Juan Dela Cruz"
                  name="contactName"
                  defaultValue={jobDoc?.contactName || ''}
                  className="mb-2"
                >
                  <TextField.Slot><FontAwesomeIcon icon={faUser} /></TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  placeholder="Phone"
                  type="tel"
                  name="contactPhone"
                  defaultValue={jobDoc?.contactPhone || ''}
                  className="mb-2"
                >
                  <TextField.Slot><FontAwesomeIcon icon={faPhone} /></TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  placeholder="Email"
                  type="email"
                  name="contactEmail"
                  defaultValue={jobDoc?.contactEmail || ''}
                  className="mb-2"
                >
                  <TextField.Slot><FontAwesomeIcon icon={faEnvelope} /></TextField.Slot>
                </TextField.Root>
              </div>
            </div>
          </div>
        </div>

        <TextArea
          defaultValue={jobDoc?.description || ''}
          placeholder="Service description"
          resize="vertical"
          name="description"
        />

        <div className="flex justify-center">
          <Button size="3">
            <span className="px-8">Save</span>
          </Button>
        </div>
      </form>
    </Theme>
  );
}
