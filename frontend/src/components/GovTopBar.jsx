import { useState } from "react";
import NationalEmblem from "./gov/NationalEmblem";

// Minimalistic Government-of-India style utility strip
export default function GovTopBar() {
  const [lang, setLang] = useState("EN");

  const setScale = (s) =>
    document.documentElement.style.setProperty("--font-scale", String(s));

  return (
    <div className="bg-[#F8FAFC] border-b border-[var(--line)] text-[var(--muted)] text-[0.7rem] py-1.5 transition-colors">
      <div className="wrap flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0 opacity-80 hover:opacity-100 transition-opacity cursor-default">
          <NationalEmblem size={16} motto={false} />
          <span className="truncate tracking-wide">
            <span className="font-medium text-[var(--ink)]">भारत सरकार</span>
            <span className="opacity-50 mx-1">|</span>Government of India
          </span>
          <span className="hidden md:inline opacity-40 mx-1">|</span>
          <span className="hidden md:inline font-medium">Ministry of Social Justice &amp; Empowerment</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-0.5" aria-label="Text size">
            <button onClick={() => setScale(0.9)}  className="w-5 h-5 flex items-center justify-center rounded hover:bg-[var(--line)] hover:text-[var(--ink)] transition-colors" aria-label="Decrease text size">A-</button>
            <button onClick={() => setScale(1)}    className="w-5 h-5 flex items-center justify-center rounded hover:bg-[var(--line)] hover:text-[var(--ink)] transition-colors" aria-label="Reset text size">A</button>
            <button onClick={() => setScale(1.15)} className="w-5 h-5 flex items-center justify-center rounded hover:bg-[var(--line)] hover:text-[var(--ink)] transition-colors" aria-label="Increase text size">A+</button>
          </div>
          <span className="hidden sm:inline opacity-20">|</span>
          <button
            onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
            className="px-2 py-0.5 rounded text-[0.65rem] border border-transparent hover:border-[var(--line-strong)] hover:bg-white text-[var(--navy)] font-semibold transition-all"
          >
            {lang === "EN" ? "हिंदी" : "English"}
          </button>
        </div>
      </div>
    </div>
  );
}
