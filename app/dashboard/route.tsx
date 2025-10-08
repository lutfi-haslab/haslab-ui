import { useState, useEffect } from "react";
import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { cn, getPageTitle } from "@/lib/utils";

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
});

function DashboardLayout() {
  const router = useRouterState();
  const pathname = router.location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pageTitle = getPageTitle(pathname);

  // Prevent hydration mismatch by only rendering UI when mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-[-12rem] h-[28rem] w-[28rem] rounded-full bg-primary/12 blur-[140px]" />
        <div className="absolute right-[-10rem] top-1/3 h-[26rem] w-[26rem] rounded-full bg-secondary/15 blur-[160px]" />
        <div className="absolute bottom-[-14rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[180px]" />
      </div>

      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        className="fixed inset-y-0 left-0 z-20"
      />

      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300 ease-out",
          isCollapsed ? "md:pl-20" : "md:pl-64"
        )}
      >
        <Header title={pageTitle} className="sticky top-0 z-10" />
        <main className="relative flex-1 px-4 pb-10 pt-6 sm:px-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}