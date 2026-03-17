"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ModalAlert from "@/components/common/ModalAlert";
import { supabase } from "@/lib/supabase/client";

const steps = [
  "Personal Info",
  "Professional Info",
  "Resume",
  "Review & Submit",
];

function Step1({ formData, handleChange, next }) {
  return (
    <div>
      <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
      <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
      <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
      <Input label="Location" name="location" value={formData.location} onChange={handleChange} />

      <div className="mt-6 flex justify-end">
        <Button onClick={next}>Next</Button>
      </div>
    </div>
  );
}

function Step2({ formData, handleChange, next, prev }) {
  return (
    <div>
      <Input label="Current Role" name="role" value={formData.role} onChange={handleChange} />
      <Input
        label="Years of Experience"
        name="experience"
        value={formData.experience}
        onChange={handleChange}
      />
      <Input label="Skills (comma-separated)" name="skills" value={formData.skills} onChange={handleChange} />
      <Input label="Portfolio / GitHub" name="portfolio" value={formData.portfolio} onChange={handleChange} />

      <div className="mt-6 flex justify-between">
        <Button variant="secondary" onClick={prev}>Back</Button>
        <Button onClick={next}>Next</Button>
      </div>
    </div>
  );
}

function Step3({ formData, handleChange, handleFileChange, next, prev }) {
  return (
    <div>
      <div className="mb-4">
        <label className="mb-1 block font-medium">Resume (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full rounded-lg border p-2 focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block font-medium">Cover Note</label>
        <textarea
          name="coverNote"
          value={formData.coverNote}
          onChange={handleChange}
          className="min-h-28 w-full rounded-lg border p-2 focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="secondary" onClick={prev}>Back</Button>
        <Button onClick={next}>Next</Button>
      </div>
    </div>
  );
}

function formatLabel(key) {
  const words = key.replace(/([A-Z])/g, " $1").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function Review({ formData, prev, handleSubmit }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Review Your Information</h2>
      <div className="space-y-2 text-gray-700">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <strong>{formatLabel(key)} : </strong> {value || "-"}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="secondary" onClick={prev}>Back</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="mb-1 block font-medium">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border p-2 focus:ring focus:ring-blue-200"
      />
    </div>
  );
}

function Button({ children, onClick, variant = "primary" }) {
  const base = "rounded-lg px-4 py-2 font-medium transition";
  const styles =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary-dark"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <button className={`${base} ${styles}`} onClick={onClick} type="button">
      {children}
    </button>
  );
}

export default function ApplyJobPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState({
    open: false,
    title: "",
    message: "",
  });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    role: "",
    experience: "",
    skills: "",
    portfolio: "",
    coverNote: "",
  });
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      const response = await fetch("/api/jobs", { cache: "no-store" });
      const data = await response.json();
      setJob(data.find((item) => item.id === id) || null);
      setIsLoading(false);
    };

    loadJobs();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    setResumeFile(event.target.files?.[0] || null);
  };

  const next = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!resumeFile) {
      setModalState({
        open: true,
        title: "Resume required",
        message: "Please upload your PDF resume before submitting.",
      });
      return;
    }

    setIsSubmitting(true);

    const uploadResponse = await fetch("/api/upload/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: resumeFile.name }),
    });
    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok) {
      setIsSubmitting(false);
      setModalState({
        open: true,
        title: "Upload failed",
        message: uploadData.error || "Unable to upload resume.",
      });
      return;
    }

    if (uploadData.token) {
      const { error } = await supabase.storage
        .from("resumes")
        .uploadToSignedUrl(uploadData.path, uploadData.token, resumeFile);

      if (error) {
        setIsSubmitting(false);
        setModalState({
          open: true,
          title: "Upload failed",
          message: error.message,
        });
        return;
      }
    } else {
      const directUpload = await fetch(uploadData.signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": resumeFile.type || "application/pdf",
        },
        body: resumeFile,
      });

      if (!directUpload.ok) {
        setIsSubmitting(false);
        setModalState({
          open: true,
          title: "Upload failed",
          message: "Unable to upload resume.",
        });
        return;
      }
    }

    const coverNote = [
      formData.coverNote,
      formData.location ? `Location: ${formData.location}` : "",
      formData.role ? `Current Role: ${formData.role}` : "",
      formData.experience ? `Experience: ${formData.experience}` : "",
      formData.skills ? `Skills: ${formData.skills}` : "",
      formData.portfolio ? `Portfolio: ${formData.portfolio}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const response = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        job_id: job.id,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        resume_url: uploadData.path,
        cover_note: coverNote,
      }),
    });
    const data = await response.json();
    setIsSubmitting(false);

    if (response.ok) {
      setModalState({
        open: true,
        title: "Application submitted",
        message: "Your application has been submitted successfully. We will review it and get back to you soon.",
      });
      return;
    }

    setModalState({
      open: true,
      title: "Submission failed",
      message: data.error || "Something went wrong.",
    });
  };

  if (isLoading) {
    return <p className="mt-10 text-center">Loading job details...</p>;
  }

  if (!job) {
    return <p className="mt-10 text-center">Job not found</p>;
  }

  return (
    <>
      <main className="mx-auto my-5 max-w-2xl rounded-md bg-white px-6 py-10 shadow-lg">
        <div className="mb-8 border-b pb-4">
          <h1 className="mb-2 text-3xl font-bold">{job.title}</h1>
          <p className="text-gray-600">
            {job.department} • {job.location} • {job.type}
          </p>
        </div>

        <div className="mb-8 flex justify-between">
          {steps.map((label, index) => (
            <div
              key={label}
              className={`flex-1 border-b-4 pb-2 text-center hover:cursor-default ${
                index <= currentStep
                  ? "border-primary text-primary"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {currentStep === 0 && (
          <Step1 formData={formData} handleChange={handleChange} next={next} />
        )}
        {currentStep === 1 && (
          <Step2
            formData={formData}
            handleChange={handleChange}
            next={next}
            prev={prev}
          />
        )}
        {currentStep === 2 && (
          <Step3
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            next={next}
            prev={prev}
          />
        )}
        {currentStep === 3 && (
          <Review
            formData={{
              ...formData,
              jobTitle: job.title,
              resume: resumeFile?.name || "",
            }}
            prev={prev}
            handleSubmit={handleSubmit}
          />
        )}

        {isSubmitting ? (
          <p className="mt-6 text-sm text-gray-500">
            Submitting your application...
          </p>
        ) : null}
      </main>

      <ModalAlert
        open={modalState.open}
        title={modalState.title}
        message={modalState.message}
        onClose={() => {
          const submitted = modalState.title === "Application submitted";
          setModalState({ open: false, title: "", message: "" });
          if (submitted) {
            router.push("/careers");
          }
        }}
      />
    </>
  );
}
