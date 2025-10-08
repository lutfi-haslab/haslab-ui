import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 to-secondary/5">
      <div className="w-full max-w-md p-8">
        <Outlet />
      </div>
    </div>
  );
}