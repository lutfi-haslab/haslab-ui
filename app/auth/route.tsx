import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary/8 via-background to-secondary/8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-10 top-10 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/4 h-72 w-72 rounded-full bg-accent/12 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 py-8">
        <div className="mb-8 text-center">
          <Link to="/" className="mb-4 inline-flex items-center justify-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary/85 to-secondary text-2xl font-semibold text-primary-foreground shadow-glow-sm">
              H
            </div>
          </Link>
        </div>
        <div className="rounded-3xl border border-border/50 bg-card/95 p-8 shadow-glow-md backdrop-blur-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}