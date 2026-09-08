import SideNavigation from "@/app/_components/SideNavigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
