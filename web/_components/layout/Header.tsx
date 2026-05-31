"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="
    app-header
    fixed
    top-0
    z-50
    flex
    w-full
    items-center
    justify-between
    bg-[#170F4A]
    px-6
    py-4
    ">
      <h1>
        <Link href="/">Habits</Link>
      </h1>

      <div className="header-actions">
        <button
          className="icon-button"
          data-bs-toggle="modal"
          data-bs-target="#clearStorageModal"
        >
          🗑️
        </button>

        <Image
          src="/media/images/profile.jpg"
          width={60}
          height={60}
          className="rounded-[25px]"
          alt="profile"
        />
      </div>
    </header>
  );
}