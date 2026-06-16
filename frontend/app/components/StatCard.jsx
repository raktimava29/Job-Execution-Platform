export default function StatCard({
  title,
  value,
  color = "bg-white"
}) {

  return (
    <div
      className={`
        p-6
        rounded-xl
        shadow
        ${color}
      `}
    >

      <h3 className="text-gray-500">
        {title}
      </h3>

      <p className="text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}