"use client";

import { showToast } from "../components/Toast";

export default function Home() {
  return (
    <div className=" flex flex-col flex-1 items-center justify-center font-sans bg-app-background">
      <h1 className="text-app-foreground">we are at home</h1>
      <button
        onClick={() =>
          showToast.success("toast initial", "toast is working fine.")
        }
      >
        on click
      </button>
    </div>
  );
}
