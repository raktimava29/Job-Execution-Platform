"use client";

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

    fetchJobs();

    const interval =
      setInterval(
        fetchJobs,
        5000
      );

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <main className="p-10">

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Jobs
      </h1>

      <JobsTable jobs={jobs} />

    </main>
  );
}