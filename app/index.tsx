import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, Sparkles, Zap, Shield, Code, Layers, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary/85 to-secondary text-base font-semibold text-primary-foreground shadow-glow-sm">
              H
            </div>
            <span className="text-lg font-semibold text-foreground">Haslab UI</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#components"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Components
            </a>
            <a
              href="#docs"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Documentation
            </a>
            <Link to="/auth/sign-in">
              <Button variant="outline" size="sm" className="shadow-none">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/sign-up">
              <Button size="sm" className="gap-1">
                Get Started
              </Button>
            </Link>
          </nav>
          <div className="md:hidden">
            <Link to="/auth/sign-in">
              <Button size="sm" className="gap-1">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
            <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute bottom-[-6rem] left-[8%] h-[24rem] w-[24rem] rounded-full bg-secondary/20 blur-3xl" />
            <div className="absolute right-[-4rem] top-1/3 h-[22rem] w-[22rem] rounded-full bg-accent/18 blur-[120px]" />
          </div>
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-24 text-center md:py-32">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary shadow-glow-sm">
              <Sparkles className="h-4 w-4" />
              <span>Built with TanStack Start & Tailwind 4</span>
            </div>

            <h1 className="text-balance text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
              Build stunning interfaces with{' '}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Haslab UI
              </span>
            </h1>

            <p className="max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
              A modern, fully-featured admin dashboard built with cutting-edge technologies.
              Beautiful, responsive, and production-ready components for your next project.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 px-8">
                  View Dashboard
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth/sign-up">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 px-8"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-border/40 bg-background/95">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-semibold md:text-5xl">Why choose Haslab UI?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Everything you need to build modern web applications, all in one place.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[{
                title: 'Lightning Fast',
                description: 'Built on TanStack Start for optimal performance and developer experience.',
                icon: <Zap className="h-7 w-7 text-primary-foreground" />, gradient: 'from-primary via-primary/80 to-secondary'
              }, {
                title: 'Component Library',
                description: '50+ beautifully designed components built with Radix UI and Tailwind CSS.',
                icon: <Layers className="h-7 w-7 text-secondary-foreground" />, gradient: 'from-secondary via-secondary/85 to-primary/70'
              }, {
                title: 'Type Safe',
                description: 'Full TypeScript support with end-to-end type safety and autocompletion.',
                icon: <Shield className="h-7 w-7 text-accent-foreground" />, gradient: 'from-accent via-accent/80 to-secondary'
              }, {
                title: 'Developer Friendly',
                description: 'Clean code, well documented, and easy to customize for your needs.',
                icon: <Code className="h-7 w-7 text-primary-foreground" />, gradient: 'from-primary via-primary/75 to-secondary/80'
              }, {
                title: 'Modern Design',
                description: 'Beautiful UI with dark mode, animations, and attention to detail.',
                icon: <Sparkles className="h-7 w-7 text-accent-foreground" />, gradient: 'from-accent via-accent/70 to-primary/70'
              }, {
                title: 'Production Ready',
                description: 'Battle-tested components ready to deploy to production immediately.',
                icon: <Rocket className="h-7 w-7 text-warning-foreground" />, gradient: 'from-warning via-warning/80 to-accent/80'
              }].map(({ title, description, icon, gradient }) => (
                <Card key={title} className="group">
                  <CardHeader>
                    <div
                      className={cn(
                        'mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-glow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110',
                        `bg-gradient-to-br ${gradient}`
                      )}
                    >
                      {icon}
                    </div>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <CardDescription className="text-base">
                      {description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/40">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 rounded-3xl border border-primary/30 bg-gradient-to-r from-primary via-primary/85 to-secondary px-8 py-16 text-center text-primary-foreground shadow-glow-lg md:px-14 md:text-left">
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-extrabold md:text-5xl">
                Ready to get started?
              </h2>
              <p className="text-lg font-medium text-primary-foreground/80">
                Join thousands of developers building amazing products with Haslab UI.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  variant="subtle"
                  className="gap-2 px-8 text-foreground"
                >
                  Explore Dashboard
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth/sign-up">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-white/60 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-border/40 bg-background/95">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary/85 to-secondary text-xs font-semibold text-primary-foreground shadow-glow-sm">
              H
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              © {new Date().getFullYear()} Haslab UI. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}