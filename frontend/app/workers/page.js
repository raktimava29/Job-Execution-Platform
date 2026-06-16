"use client";

import { useEffect, useState } from "react";
import api from "../services/api";

import WorkersTable from "../components/WorkersTable";

export default function WorkersPage() {

  const [workers, setWorkers] =
    useState([]);

  const fetchWorkers =
    async () => {

      try {

        const response =
          await api.get(
            "/workers"
          );

        setWorkers(
          response.data.data
        );

      } catch(error) {

        console.error(error);

      }

    };

  useEffect(() => {

    fetchWorkers();

    const interval =
      setInterval(
        fetchWorkers,
        5000
      );

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Workers
      </h1>

      <WorkersTable
        workers={workers}
      />
    </main>
  );
}