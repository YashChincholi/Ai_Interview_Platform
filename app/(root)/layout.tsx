import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/actions/auth.action";
import type { ReactNode } from "react";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col root-layout">
      <Navbar userName={user?.name} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
