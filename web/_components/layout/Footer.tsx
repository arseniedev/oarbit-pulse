"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="
    app-footer
    fixed
    bottom-0
    flex
    w-full
    justify-around
    bg-[#201e33]
    py-4
    ">
      <Link href="/habits">
        <i className="fa fa-calendar"></i>
        <p>Habits</p>
      </Link>

      <Link href="/statistics">
        <i className="fa fa-pie-chart"></i>
        <p>Statistics</p>
      </Link>

      <Link href="/loop">
        <i className="fa fa-clock-o"></i>
        <p>Loop</p>
      </Link>

      <Link href="/help">
        <i className="fa fa-question-circle"></i>
        <p>Help</p>
      </Link>
    </footer>
  );
}