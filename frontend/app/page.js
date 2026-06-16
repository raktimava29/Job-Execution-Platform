"use client";

import { useEffect, useState } from "react";
import api from "./services/api";
import StatCard from "./components/StatCard";

export default function Dashboard() {

  const [stats, setStats] =
    useState(null);
    
  const [jobs, setJobs] =
    useState([]);
    
  const [workers, setWorkers] =
    useState([]); 

  const fetchStats = async () => {

    try {

      const statsResponse =
        await api.get("/stats");

      setStats(
        statsResponse.data.data
      );

      const jobsResponse =
        await api.get("/jobs");

      setJobs(
        jobsResponse.data.data
          .slice(0, 5)
      );

      const workersResponse =
        await api.get("/workers");

      setWorkers(
        workersResponse.data.data
          .slice(0, 5)
      );

    } catch(error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchStats();

    const interval =
      setInterval(
        fetchStats,
        5000
      );

    return () =>
      clearInterval(interval);

  }, []);

  if (!stats) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }

  return (

    <main className="p-10">

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Distributed Job Dashboard
      </h1>

      <div className="
        grid
        grid-cols-3
        gap-6
      ">

        <StatCard
          title="Total Jobs"
          value={stats.totalJobs}
        />

        <StatCard
          title="Completed Jobs"
          value={stats.completedJobs}
          color="bg-green-200"
        />

        <StatCard
          title="Failed Jobs"
          value={stats.failedJobs}
          color="bg-red-200"
        />

        <StatCard
          title="Running Jobs"
          value={stats.runningJobs}
          color="bg-blue-200"
        />

        <StatCard
          title="Online Workers"
          value={stats.onlineWorkers}
          color="bg-green-200"
        />

        <StatCard
          title="Offline Workers"
          value={stats.offlineWorkers}
          color="bg-red-200"
        />

      </div>

      <div className="mt-10">

        <h2 className="
          text-2xl
          font-bold
          mb-4
        ">
          Recent Jobs
        </h2>

        <div className="
          bg-white
          rounded-xl
          shadow
          p-4
        ">

          {jobs.map(job => (

            <div
              key={job.id}
              className="
                flex
                justify-between
                py-2
                border-b
              "
            >

              <span>
                {job.name}
              </span>

              <span>
                {job.status}
              </span>

            </div>

          ))}

        </div>

      </div>

      <div className="mt-10">

  <h2 className="
    text-2xl
    font-bold
    mb-4
  ">
    Recent Workers
  </h2>

  <div className="
    bg-white
    rounded-xl
    shadow
    p-4
  ">

    {workers.map(worker => (

      <div
        key={worker.id}
        className="
          flex
          justify-between
          py-2
          border-b
        "
      >

        <span>
          {worker.worker_name}
        </span>

        <span>
          {worker.status}
        </span>

      </div>

    ))}

  </div>

</div>

    </main>

  );

}