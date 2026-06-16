"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import api from "../../services/api";

export default function JobDetails() {

  const params = useParams();

  const [job, setJob] =
    useState(null);

  const [executions, setExecutions] =
    useState([]);

  const fetchJob = async () => {

    try {

      const response =
        await api.get(
          `/jobs/${params.id}`
        );

      setJob(
        response.data.data.job
      );

      setExecutions(
        response.data.data.executions
      );

    } catch(error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchJob();

    const interval =
      setInterval(
        fetchJob,
        5000
      );

    return () =>
      clearInterval(interval);

  }, []);

  if (!job) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }

  const getStatusClass = (
    status
  ) => {

    switch(status) {

      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "RUNNING":
        return "bg-blue-100 text-blue-700";

      case "FAILED":
        return "bg-red-100 text-red-700";

      case "QUEUED":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  };

  return (
    <main className="p-10">
      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Job Details
      </h1>

      <div className="
        bg-white
        rounded-xl
        shadow
        p-6
        mb-8
      ">

        <div className="
          grid
          grid-cols-2
          gap-6
        ">

          <p>
            <strong>Name:</strong>
            {" "}
            {job.name}
          </p>

          <div>

            <strong>Status:</strong>

            <span
              className={`
                ml-2
                px-3
                py-1
                rounded-full
                text-sm
                font-medium
                ${getStatusClass(
                  job.status
                )}
              `}
            >
              {job.status}
            </span>
          </div>
          <div>

            <strong>
              Progress
            </strong>

            <div className="mt-2">
              <div className="
                w-full
                bg-gray-200
                rounded-full
                h-3
              ">

                <div
                  className="
                    bg-blue-600
                    h-3
                    rounded-full
                  "
                  style={{
                    width:
                      `${job.progress}%`
                  }}
                />

              </div>

              <p className="mt-1">
                {job.progress}%
              </p>

            </div>
          </div>

          <p>
            <strong>
              Priority:
            </strong>
            {" "}
            {job.priority}
          </p>

          <p>
            <strong>
              Attempts:
            </strong>
            {" "}
            {job.attempts}
            /
            {job.max_attempts}
          </p>

          <p>
            <strong>
              Assigned Worker:
            </strong>
            {" "}
            {
              job.assigned_worker
              ||
              "N/A"
            }
          </p>

          <p>
            <strong>
              Created:
            </strong>
            {" "}
            {
              new Date(
                job.created_at
              ).toLocaleString()
            }
          </p>
        </div>
      </div>

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        Execution History
      </h2>

      <div className="
        bg-white
        rounded-xl
        shadow
        overflow-hidden
      ">

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">
                Worker
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Started
              </th>

              <th className="p-4 text-left">
                Ended
              </th>

              <th className="p-4 text-left">
                Error
              </th>
            </tr>
          </thead>
          <tbody>

            {executions.map(
              execution => (

              <tr
                key={execution.id}
                className="
                  border-t
                  hover:bg-gray-50
                "
              >
                <td className="p-4">
                  {
                    execution.worker_id
                  }
                </td>

                <td className="p-4">

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-medium
                      ${getStatusClass(
                        execution.status
                      )}
                    `}
                  >
                    {
                      execution.status
                    }
                  </span>

                </td>

                <td className="p-4">

                  {
                    new Date(
                      execution.started_at
                    ).toLocaleString()
                  }

                </td>

                <td className="p-4">

                  {
                    execution.ended_at
                    ?
                    new Date(
                      execution.ended_at
                    ).toLocaleString()
                    :
                    "-"
                  }

                </td>

                <td className="p-4">

                  {
                    execution.error_message
                    ||
                    "-"
                  }

                </td>

              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}