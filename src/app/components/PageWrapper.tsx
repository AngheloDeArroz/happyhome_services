"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <div
      style={
        isHomepage
          ? {
              backgroundImage: "url('/imgs/bgtest.png')", 
              backgroundSize: "130% auto",
              backgroundPosition: "center 1%",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              minHeight: "100vh",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
