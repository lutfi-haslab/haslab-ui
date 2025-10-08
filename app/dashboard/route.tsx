import { useState } from "react";
import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { getPageTitle } from "@/lib/utils";

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  const router = useRouterState();
  const pathname = router.location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pageTitle = getPageTitle(pathname);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        isCollapsed={isCollapsed} 
        onToggle={() => setIsCollapsed(!isCollapsed)} 
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={pageTitle} />
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}