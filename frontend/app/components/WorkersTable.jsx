const getStatusClass = (status) => {

  switch(status) {

    case "ONLINE":
      return "bg-green-100 text-green-700";

    case "BUSY":
      return "bg-blue-100 text-blue-700";

    case "OFFLINE":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";

  }

};

export default function WorkersTable({
  workers
}) {

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>

            <th className="p-4 text-left">
              Worker Name
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Current Job
            </th>

            <th className="p-4 text-left">
              Last Heartbeat
            </th>

          </tr>

        </thead>

        <tbody>

          {workers.map(worker => (

            <tr
              key={worker.id}
              className="
                border-t
                hover:bg-gray-50
              "
            >

              <td className="p-4">
                {worker.worker_name}
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
                      worker.status
                    )}
                  `}
                >
                  {worker.status}
                </span>

              </td>

              <td className="p-4">

                {
                    worker.status === "BUSY"
                        ? worker.current_job_id
                        : "-"
                }

              </td>

              <td className="p-4">
                {
                new Date(
                    worker.last_heartbeat
                    ).toLocaleString("en-IN")
                }
            </td>

            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
}