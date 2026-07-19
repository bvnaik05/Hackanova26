import { Link } from "react-router-dom";
import {
  Search, FileCheck2, FilePlus2, Phone, ShieldCheck, Languages,
  ArrowRight, BadgeIndianRupee, UserCheck, CheckCircle2,
} from "lucide-react";
import GovHeader from "./GovHeader";
import GovFooter from "./GovFooter";
import { auth } from "../api";

const features = [
  { icon: Search, title: "Discover eligible schemes",
    desc: "Answer a few details and instantly see the Central and State welfare schemes you actually qualify for — no jargon, no guesswork." },
  { icon: FileCheck2, title: "Fetch documents automatically",
    desc: "Securely pull your Aadhaar, PAN and certificates from DigiLocker with your consent — no scanning, no queues." },
  { icon: FilePlus2, title: "Apply with ease",
    desc: "Haqq pre-fills applications from your profile and documents, so form-filling becomes a few taps instead of hours." },
  { icon: Phone, title: "Works over a phone call",
    desc: "No smartphone or literacy needed — call in and speak your need in your own language to find your schemes." },
];

const steps = [
  { n: 1, title: "Tell us about yourself", desc: "Age, income, occupation — once. Your details stay private and consented." },
  { n: 2, title: "See what you're entitled to", desc: "We match you to schemes and show exactly why you're eligible." },
  { n: 3, title: "Fetch documents & apply", desc: "Pull documents from DigiLocker and submit a pre-filled application." },
];

const stats = [
  { value: "3,000+", label: "Welfare schemes" },
  { value: "22", label: "Languages supported" },
  { value: "₹0", label: "Cost to citizens" },
];

export default function Home() {
  const loggedIn = auth.isLoggedIn();
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] selection:bg-blue-100">
      <GovHeader />

      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-white hero-grid pb-20 pt-10 md:pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />
        <div className="wrap grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="fade-up">
            <span className="badge badge-info mb-6 bg-blue-50/80 border-blue-100 backdrop-blur-sm px-4 py-1.5 shadow-sm">
              <ShieldCheck size={16} /> Consent-based · Secure · Multilingual
            </span>
            <h1 className="font-heading text-[2.5rem] md:text-6xl font-extrabold leading-[1.1] text-[var(--ink)]">
              Know your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Haqq</span>.<br />
              Claim what is <span className="text-[var(--navy)]">rightfully yours.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[var(--muted)] max-w-xl leading-relaxed">
              Millions of eligible citizens never receive the welfare they deserve — simply
              because finding and applying is hard. Haqq finds the schemes you qualify for,
              fetches your documents, and helps you apply — in your language.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={loggedIn ? "/dashboard" : "/login"} className="btn btn-primary btn-lg group shadow-blue-900/10 hover:shadow-blue-900/20">
                {loggedIn ? "Go to my dashboard" : "Find my schemes"} 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#how" className="btn btn-outline btn-lg bg-white/50 backdrop-blur-sm">How it works</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-[var(--body)]">
              <span className="flex items-center gap-2"><Languages size={18} className="text-blue-500" /> 22 languages</span>
              <span className="flex items-center gap-2"><Phone size={18} className="text-blue-500" /> Call-in access</span>
              <span className="flex items-center gap-2"><UserCheck size={18} className="text-blue-500" /> Real eligibility check</span>
            </div>
          </div>

          {/* Hero preview card */}
          <div className="fade-up lg:justify-self-end w-full max-w-md" style={{ animationDelay: '150ms' }}>
            <div className="glass-card rounded-[24px] p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--navy)]">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <BadgeIndianRupee size={18} className="text-blue-600" />
                  </div>
                  Schemes matched to you
                </div>
                <span className="badge badge-ok shadow-sm px-3 py-1">3 eligible</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Post-Matric Scholarship", tag: "ok" },
                  { name: "Skill Loan Scheme", tag: "ok" },
                  { name: "Income-based Housing Support", tag: "warn" },
                ].map((s) => (
                  <div key={s.name}
                    className="flex items-center justify-between rounded-xl border border-white/60 bg-white/60 backdrop-blur-md px-4 py-3.5 shadow-sm transition-all hover:bg-white hover:shadow-md cursor-default">
                    <span className="font-semibold text-[var(--ink)] text-sm">{s.name}</span>
                    <span className={`badge ${s.tag === "ok" ? "badge-ok" : "badge-warn"}`}>
                      {s.tag === "ok" ? "Eligible" : "Needs info"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100/50 border border-orange-100 p-4 text-sm font-medium text-orange-900 flex gap-3 shadow-inner">
                <span className="text-xl">🔊</span> 
                <span>“पैसा मेरी बेटी की पढ़ाई के लिए” → matched to scholarships, instantly.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Stats */}
      <section className="bg-white border-y border-[var(--line)]">
        <div className="wrap grid grid-cols-3 divide-x divide-[var(--line-strong)] py-8 md:py-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-4 hover:scale-105 transition-transform duration-300">
              <div className="font-heading text-3xl md:text-5xl font-extrabold text-[var(--navy)] tracking-tight">{s.value}</div>
              <div className="text-xs md:text-sm font-medium text-[var(--muted)] mt-2 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------- Features */}
      <section className="wrap py-16 md:py-24" id="about">
        <div className="text-center max-w-2xl mx-auto fade-up">
          <span className="eyebrow bg-blue-50 px-3 py-1 rounded-full">What Haqq does</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-4">
            One place for every right you're entitled to
          </h2>
          <p className="text-[var(--muted)] text-lg mt-4 leading-relaxed">
            Haqq bridges the last mile between citizens and welfare — discovery, documents, and application.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-16">
          {features.map((f, i) => (
            <div key={f.title} className="card card-hover p-6 md:p-8 rounded-[20px]" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-14 h-14 rounded-2xl bg-blue-50/80 text-blue-600 border border-blue-100
                flex items-center justify-center shadow-inner mb-6">
                <f.icon size={26} strokeWidth={2.5} />
              </div>
              <h3 className="font-heading text-lg font-bold">{f.title}</h3>
              <p className="mt-3 text-[15px] text-[var(--muted)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------- How it works */}
      <section className="bg-[var(--surface-2)]" id="how">
        <div className="wrap py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow bg-white border border-[var(--line)] px-3 py-1 rounded-full shadow-sm">Simple process</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-4">How Haqq works</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3 mt-16 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-[var(--line-strong)] to-transparent" />
            
            {steps.map((s) => (
              <div key={s.n} className="text-center relative group">
                <div className="mx-auto w-20 h-20 rounded-2xl bg-white border border-[var(--line-strong)] text-[var(--navy)]
                  flex items-center justify-center text-3xl font-extrabold shadow-sm group-hover:shadow-md group-hover:border-blue-200 group-hover:text-blue-600 group-hover:-translate-y-1 transition-all duration-300 relative z-10">
                  {s.n}
                </div>
                <h3 className="font-heading mt-6 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-[15px] text-[var(--muted)] max-w-xs mx-auto leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to={loggedIn ? "/dashboard" : "/login"} className="btn btn-saffron btn-lg px-8 py-4 text-lg shadow-orange-500/20 hover:shadow-orange-500/40">
              Get started <ArrowRight size={20} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- CTA band */}
      <section className="wrap py-16 md:py-24">
        <div className="glass-card overflow-hidden rounded-[24px] relative">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-orange-400 to-orange-600" />
          <div className="grid md:grid-cols-2 bg-white/40">
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/50">
              <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight">Welfare should reach everyone.</h2>
              <p className="mt-4 text-[var(--muted)] text-lg leading-relaxed">
                Whether you have a smartphone or just a basic phone, Haqq meets you where you are —
                in the language you speak, with the documents you already have.
              </p>
              <Link to={loggedIn ? "/dashboard" : "/login"} className="btn btn-primary mt-8">
                {loggedIn ? "Open my dashboard" : "Check my eligibility"} <ArrowRight size={18} />
              </Link>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center bg-white/20">
              <ul className="space-y-5">
                {[
                  "Encrypted PIN — your mobile number is never stored in the clear.",
                  "Documents fetched only with your explicit consent (DPDP Act, 2023).",
                  "Transparent eligibility — see exactly why you qualify.",
                  "Free forever for every citizen of India.",
                ].map((t) => (
                  <li key={t} className="flex gap-4 text-[15px] font-medium text-[var(--body)] bg-white/50 p-3 rounded-xl border border-white/50 shadow-sm">
                    <CheckCircle2 size={20} className="text-green-600 shrink-0 mt-0.5" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="flex-1" />
      <GovFooter />
    </div>
  );
}
