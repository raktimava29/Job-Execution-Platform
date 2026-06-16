"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../services/api";
import JobsTable from "../components/JobsTable";

export default function JobsPage() {

  const [jobs, setJobs] =
    useState([]);

  const fetchJobs = async () => {
    try {

      const response =
        await api.get("/jobs");

      setJobs(
        response.data.data
      );

    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {

  const loadJobs =
    async () => {

      try {

        const response =
          await api.get("/jobs");

        setJobs(
          response.data.data
        );

      } catch(error) {

        console.error(error);

      }

    };

    loadJobs();

    const interval =
      setInterval(
        loadJobs,
        5000
      );

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <main className="p-10">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Jobs
        </h1>

        <Link
          href="/jobs/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Create Job
        </Link>

      </div>
      
      <JobsTable jobs={jobs} />
    </main>
  );
}