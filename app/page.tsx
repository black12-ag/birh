"use client";

import { useEffect, useRef, useState } from "react";
import ScreenStart from "./components/ScreenStart";
import MainContent from "./components/MainContent";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 7000);

    // Create audio and try autoplay immediately
    const audio = new Audio("/music/birthday_song.webm");
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    const tryPlay = () => {
      audio.play().catch(() => {
        // Autoplay blocked by browser — play on first user interaction
        const playOnInteraction = () => {
          audio.play().catch(() => {});
          document.removeEventListener("click", playOnInteraction);
          document.removeEventListener("touchstart", playOnInteraction);
          document.removeEventListener("keydown", playOnInteraction);
        };
        document.addEventListener("click", playOnInteraction, { once: true });
        document.addEventListener("touchstart", playOnInteraction, { once: true });
        document.addEventListener("keydown", playOnInteraction, { once: true });
      });
    };

    tryPlay();

    return () => {
      clearTimeout(contentTimer);
      audio.pause();
      audio.src = "";
    };
  }, []);

  return (
    <div className="h-screen">
      <ScreenStart />
      {showContent && <MainContent />}
    </div>
  );
}
