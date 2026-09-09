"use client";

import Link from "next/link";
import ForestIllustration from "../components/ForestIllustration";

export default function Home() {
  return (
    <div className="group relative flex min-h-screen flex-1 flex-col items-center justify-center overflow-hidden bg-app-background px-8 text-center font-sans">
      <div
        aria-hidden="true"
        className="
    pointer-events-none absolute inset-0 overflow-hidden
  "
      ></div>

      <div className="relative z-10 flex  flex-col items-center gap-6">
        <h1
          className="
            text-app-foreground text-3xl leading-tight
            transition-all duration-700 ease-out
            lg:text-6xl
            group-hover:-translate-y-1
          "
        >
          Welcome to{" "}
          <span className="transition-colors duration-500 group-hover:text-green-600">
            🌿Freshmart
          </span>{" "}
          Admin Panel.
        </h1>

        <Link
          href="/dashboard"
          className="
            group/button relative overflow-hidden
            rounded-md bg-button-secondary-bg
            px-4 py-2.5
            text-sm font-medium text-button-secondary-text
            shadow-sm
            transition-all duration-300 ease-out
            hover:-translate-y-1
            hover:bg-button-secondary-bg-hover
            hover:shadow-lg hover:shadow-green-900/10
            active:translate-y-0
          "
        >
          <span
            className="
              relative z-10
              transition-all duration-300
              group-hover/button:tracking-wide
            "
          >
            Visit Dashboard
          </span>

          <span
            aria-hidden="true"
            className="
              absolute inset-0 -translate-x-full
              bg-green-500/10
              transition-transform duration-500
              group-hover/button:translate-x-0
            "
          />
        </Link>
      </div>

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-0 top-0
          hidden w-[320px] -translate-x-1/6 -translate-y-1/6
          scale-x-[-1] opacity-95
          transition-all duration-1000 ease-out
          md:block
          lg:w-[480px]
          group-hover:-translate-x-[12%]
          group-hover:-translate-y-[12%]
          group-hover:scale-x-[-1.03]
          group-hover:opacity-100
        "
      >
        <ForestIllustration />
      </div>

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute bottom-0 right-0
          hidden w-[320px] translate-x-1/6 translate-y-1/6
          opacity-95
          transition-all duration-1000 ease-out
          md:block
          lg:w-[480px]
          group-hover:translate-x-[12%]
          group-hover:translate-y-[12%]
          group-hover:scale-[1.03]
          group-hover:opacity-100
        "
      >
        <ForestIllustration />
      </div>
    </div>
  );
}
