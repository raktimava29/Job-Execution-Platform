import Link from "next/link";

const getStatusClass = (status) => {
  switch (status) {
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

export default function JobsTable({
  jobs
}) {

  return (

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>

            <th className="p-4 text-left">
              Job Name
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Progress
            </th>

            <th className="p-4 text-left">
              Priority
            </th>

            <th className="p-4 text-left">
              Attempts
            </th>

            <th className="p-4 text-left">
              Created
            </th>

          </tr>
        </thead>
        <tbody>

          {jobs.map((job) => (

            <tr
              key={job.id}
              className="
                border-t
                hover:bg-gray-50
              "
            >

              <td className="p-4">
                <Link
                  href={`/jobs/${job.id}`}
                  className="
                    text-blue-600
                    hover:underline
                    font-medium
                  "
                >
                  {job.name}
                </Link>
              </td>

              <td className="p-4">
                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-medium
                    ${getStatusClass(job.status)}
                  `}
                >
                  {job.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="
                    w-32
                    bg-gray-200
                    rounded-full
                    h-2
                  ">

                    <div
                      className="
                        bg-blue-600
                        h-2
                        rounded-full
                      "
                      style={{
                        width: `${job.progress}%`
                      }}
                    />
                  </div>

                  <span>
                    {job.progress}%
                  </span>
                </div>
              </td>

              <td className="p-4">
                {job.priority}
              </td>

              <td className="p-4">
                {job.attempts} / {job.max_attempts}
              </td>

              <td className="p-4">
                {
                  new Date(
                    job.created_at
                  ).toLocaleString()
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}