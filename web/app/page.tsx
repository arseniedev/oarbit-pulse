"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // --- Audio logic (replacement for OarBitAudio) ---
    const audio = new Audio("/media/audio/openingAudio.mp3"); 
    audio.play().catch(() => {
      // autoplay may be blocked by browser
    });

    // --- Redirect after 3 seconds ---
    const timer = setTimeout(() => {
      router.push("/help");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div id="starting-page" className="flex flex-col items-center justify-center h-screen bg-black text-white">
      
      {/* Opening animation */}
      <img
        className="w-64 mb-6"
        src="/media/animation/opening-animated.gif"
        alt="opening animation"
      />

      {/* Redirect indicator */}
      <div id="redirect" className="flex items-center gap-2 text-sm opacity-80">
        <div className="animate-spin rounded-full h-4 w-4 border border-white border-t-transparent" />
        Redirecting...
      </div>
    </div>
  );
}