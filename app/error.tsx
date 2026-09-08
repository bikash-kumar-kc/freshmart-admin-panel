"use client";

import Link from "next/link";

interface IErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: IErrorProps) {
  const isDevelopment = process.env.NEXT_PUBLIC_NEXT_ENV === "development";

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-app-background">
      <div className="w-full max-w-md text-center">
        {/* Error indicator */}
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand-cta-soft text-brand-cta">
          <span className="text-xl font-semibold">!</span>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-semibold tracking-tight text-app-foreground">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-6 text-app-muted-foreground">
          We encountered an unexpected error. Please try again or return to the
          homepage.
        </p>

        {/* Development error */}
        {isDevelopment && (
          <div className="mt-6 rounded-lg border border-app-border bg-app-muted px-4 py-3 text-left">
            <p className="text-xs font-medium text-app-muted-foreground">
              Error details
            </p>

            <p className="mt-1 wrap-break-word text-sm text-app-foreground">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-md bg-button-primary-bg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 "
          >
            Try again
          </button>

          <Link
            href="/"
            className="rounded-md border border-app-border px-4 py-2 text-sm font-medium text-app-foreground transition-colors hover:text-app-muted-foreground-hover"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
