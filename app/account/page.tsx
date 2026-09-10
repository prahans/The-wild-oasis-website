import type { Metadata } from "next";
import { auth } from "@/app/_lib/auth";

export const metadata: Metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();
  console.log(session);
  const firstName = session?.user?.name?.split(" ").at(0) ?? "Guest";
  return (
    <>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {firstName}
      </h2>
    </>
  );
}
