import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="
      bg-black
      text-white
      px-8
      py-4
    ">

      <div className="
        flex
        gap-8
      ">

        <Link href="/">
          Dashboard
        </Link>

        <Link href="/jobs">
          Jobs
        </Link>

        <Link href="/workers">
          Workers
        </Link>

      </div>
    </nav>
  );
}