import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "Haslab UI - TanStack Start" },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
                  var root = document.documentElement;
                  root.classList.remove('light', 'dark');
                  root.classList.add(theme);
                  root.setAttribute('data-theme', theme);
                  root.style.colorScheme = theme;
                  const body = document.body;
                  if (body) {
                    body.classList.remove('light', 'dark');
                    body.classList.add(theme);
                    body.setAttribute('data-theme', theme);
                    body.style.colorScheme = theme;
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider defaultTheme="light">
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              <Outlet />
            </div>
            <Toaster position="top-right" />
          </div>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}