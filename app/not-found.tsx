import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute('/not-found')({
  component: NotFound,
});

function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-secondary/10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-[-6rem] top-1/3 h-72 w-72 rounded-full bg-accent/12 blur-[120px]" />
      </div>
      <div className="relative z-10 max-w-xl rounded-3xl border border-border/50 bg-card/95 p-12 text-center shadow-glow-lg backdrop-blur-2xl">
        <div className="space-y-4">
          <span className="text-sm font-semibold uppercase tracking-[0.36em] text-muted-foreground">
            Error
          </span>
          <h1 className="text-7xl font-extrabold leading-none text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page not found</h2>
          <p className="text-balance text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Back to dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}