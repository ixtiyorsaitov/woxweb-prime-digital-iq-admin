"use client";

import { AppSidebar } from "@/components/core/app-sidebar";
import PageLoader from "@/components/core/page-loader";
import Navbar from "@/components/shared/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth");
    }
  }, [status, router]);

  return status !== "authenticated" ? (
    <PageLoader />
  ) : (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="md:m-2 ml-0! md:rounded-md overflow-auto scrollbar-thin bg-sidebar shadow md:border w-full flex items-center md:max-h-[calc(100vh-1rem)] ">
          <div className="max-w-[1600px] w-full">
            <Navbar />
            <div className="p-2">{children}</div>
          </div>
          {/* <SearchCommand /> */}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
