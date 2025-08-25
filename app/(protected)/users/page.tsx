import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1>users</h1>
      <Link href="/users/detail/1">Tambah User</Link>
    </div>
  );
}
