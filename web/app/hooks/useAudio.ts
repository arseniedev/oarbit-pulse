"use client";

export function useAudio() {
  function playAudio(type: string) {
    // later replace with real audio map
    console.log("Playing:", type);
  }

  return { playAudio };
}