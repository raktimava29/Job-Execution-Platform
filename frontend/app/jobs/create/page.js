"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "../../services/api";

export default function CreateJobPage() {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [payload, setPayload] =
    useState(
      JSON.stringify(
        {
          task: "demo-job"
        },
        null,
        2
      )
    );

  const [priority, setPriority] =
    useState("5");

  const [maxAttempts, setMaxAttempts] =
    useState(3);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await api.post(
          "/jobs",
          {
            name,

            payload:
              payload
              ?
              JSON.parse(payload)
              :
              {},

            priority:
              Number(priority),

            maxAttempts:
              Number(maxAttempts)
          }
        );

        alert(
          "Job created successfully"
        );

        router.push(
          "/jobs"
        );

      } catch(error) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          "Failed to create job"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <main className="
      max-w-3xl
      mx-auto
      p-10
    ">

      <div className="mb-8">

        <h1 className="
          text-4xl
          font-bold
        ">
          Create Job
        </h1>

        <p className="
          text-gray-500
          mt-2
        ">
          Submit a new job to the
          distributed execution system.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          rounded-2xl
          shadow
          p-8
          space-y-6
        "
      >

        <div>

          <label className="
            block
            mb-2
            font-medium
          ">
            Job Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            required
            className="
              w-full
              border
              rounded-lg
              p-3
            "
            placeholder="Image Processing Job"
          />

        </div>

        <div>

          <label className="
            block
            mb-2
            font-medium
          ">
            Payload (Optional)
          </label>

          <textarea
            rows={8}
            value={payload}
            onChange={(e) =>
              setPayload(
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-lg
              p-3
              font-mono
              text-sm
            "
          />

        </div>

        <div className="
          grid
          grid-cols-2
          gap-6
        ">

          <div>

            <label className="
              block
              mb-2
              font-medium
            ">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-lg
                p-3
              "
            >

              <option value="1">
                Low
              </option>

              <option value="5">
                Medium
              </option>

              <option value="10">
                High
              </option>

            </select>

          </div>

          <div>

            <label className="
              block
              mb-2
              font-medium
            ">
              Max Attempts
            </label>

            <input
              type="number"
              min="1"
              max="10"
              value={maxAttempts}
              onChange={(e) =>
                setMaxAttempts(
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-lg
                p-3
              "
            />

          </div>

        </div>

        <div className="
          flex
          justify-end
          gap-4
          pt-4
        ">

          <button
            type="button"
            onClick={() =>
              router.push(
                "/jobs"
              )
            }
            className="
              px-6
              py-3
              border
              rounded-lg
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-lg
              hover:bg-blue-700
              disabled:opacity-50
            "
          >

            {
              loading
              ?
              "Creating..."
              :
              "Create Job"
            }

          </button>

        </div>

      </form>

    </main>

  );

}