import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ShieldCheck, Phone, KeyRound, Loader2, Languages, PhoneCall } from "lucide-react";
import GovHeader from "./GovHeader";
import GovFooter from "./GovFooter";
import { api, auth } from "../api";

const AGE    = [["1", "Below 18"], ["2", "18–35"], ["3", "36–59"], ["4", "60+"]];
const GENDER = [["1", "Male"], ["2", "Female"], ["3", "Other"]];
const INCOME = [["1", "Below ₹2L"], ["2", "₹2L–5L"], ["3", "Above ₹5L"]];
const OCC    = [["1", "Student"], ["2", "Farmer"], ["3", "Govt employee"], ["4", "Other"]];
const STATES = [
  "", "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
].map((s) => [s, s || "Select State"]);

export default function Login({ onLoginSuccess }) {
  const nav = useNavigate();
  const [mode, setMode] = useState("login");
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState({
    mobile_number: "", pin: "", age_slab: "2", gender: "1",
    income_slab: "1", annual_income: "", occupation: "1", state: "",
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const finish = (res) => {
    auth.save(res.access_token, res.user);
    toast.success("Welcome to Haqq");
    onLoginSuccess?.();
    nav("/dashboard");
  };

  const doLogin = async () => {
    if (!f.mobile_number || !f.pin) return toast.error("Enter mobile number and PIN");
    setBusy(true);
    try { finish(await api.login(f.mobile_number, f.pin)); }
    catch (e) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  const doRegister = async () => {
    if (!f.mobile_number || f.pin.length < 4) return toast.error("Enter mobile and a 4–6 digit PIN");
    setBusy(true);
    try {
      await api.register({
        mobile_number: f.mobile_number, pin: f.pin,
        age_slab: f.age_slab, gender: f.gender, income_slab: f.income_slab,
        annual_income: Number(f.annual_income) || 0, occupation: f.occupation,
        state: f.state,
      });
      toast.success("Registered — logging you in");
      finish(await api.login(f.mobile_number, f.pin));
    } catch (e) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  const Select = ({ label, k, opts }) => (
    <label className="block">
      <span className="label text-[13px] font-bold text-[var(--ink)] uppercase tracking-wider mb-1.5">{label}</span>
      <select className="field rounded-xl shadow-sm border-gray-200 focus:ring-4 focus:ring-blue-500/10 text-[14px]" value={f[k]} onChange={set(k)}>
        {opts.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
      </select>
    </label>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] selection:bg-blue-100">
      <GovHeader />
      
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center">
        <div className="w-[800px] h-[800px] bg-gradient-to-tr from-blue-50/50 to-orange-50/50 rounded-full blur-3xl opacity-60 translate-y-[-20%]"></div>
      </div>

      <main className="flex-1 wrap py-12 md:py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left: reassurance */}
        <div className="hidden lg:block fade-up">
          <span className="eyebrow bg-blue-50 px-3 py-1 rounded-full text-blue-600">Citizen portal</span>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold mt-6 leading-tight">
            {mode === "login" ? "Sign in to your account" : "Create your Haqq account"}
          </h1>
          <p className="mt-6 text-[17px] text-[var(--muted)] max-w-md leading-relaxed font-medium">
            Use your mobile number and PIN to see the welfare schemes you're entitled to
            and apply with your documents — securely and privately.
          </p>
          <ul className="mt-10 space-y-5 max-w-md">
            {[
              "Your PIN is encrypted; your phone number is never stored in the clear.",
              "Documents are fetched only with your explicit consent (DPDP Act, 2023).",
              "No smartphone? The same service works over a phone call.",
            ].map((t) => (
              <li key={t} className="flex gap-4 text-[15px] font-medium text-[var(--body)] bg-white/50 p-4 rounded-xl border border-white/60 shadow-sm">
                <ShieldCheck className="text-green-600 shrink-0 mt-0.5" size={20} /> {t}
              </li>
            ))}
          </ul>

          <div className="mt-10 card p-5 flex items-center gap-4 max-w-md bg-gradient-to-r from-orange-50 to-white border-orange-100 rounded-2xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
              <PhoneCall size={20} />
            </div>
            <div>
              <div className="font-heading font-bold text-[var(--ink)] text-[16px]">Prefer to call?</div>
              <div className="text-[14px] text-[var(--muted)] font-medium mt-0.5">Dial our toll-free IVR to find schemes by voice.</div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="w-full max-w-md justify-self-center lg:justify-self-end fade-up" style={{ animationDelay: '100ms' }}>
          <div className="glass-card rounded-[24px] p-6 md:p-10 shadow-xl shadow-blue-900/5">
            <div className="flex items-center justify-center gap-2 text-[var(--navy)] text-[13px] font-bold mb-8 bg-blue-50/50 py-2 rounded-xl">
              <Languages size={16} className="text-blue-600" /> Available in 22 Indian languages
            </div>

            <div className="flex rounded-xl bg-gray-100/80 p-1.5 mb-8 border border-white/50 shadow-inner">
              {["login", "register"].map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  className={`flex-1 py-3 rounded-lg text-[14px] font-bold capitalize transition-all duration-300 ${
                    mode === m ? "bg-white text-[var(--navy)] shadow-sm scale-[1.02]" : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}>
                  {m === "login" ? "Login" : "Register"}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              <label className="block">
                <span className="label text-[13px] font-bold text-[var(--ink)] uppercase tracking-wider mb-1.5">Mobile number</span>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                  <input className="field pl-12 py-3.5 text-[15px] rounded-xl shadow-sm border-gray-200 focus:ring-4 focus:ring-blue-500/10 transition-all" inputMode="numeric" placeholder="10-digit mobile number"
                    value={f.mobile_number} onChange={set("mobile_number")} />
                </div>
              </label>
              <label className="block">
                <span className="label text-[13px] font-bold text-[var(--ink)] uppercase tracking-wider mb-1.5">PIN</span>
                <div className="relative">
                  <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                  <input className="field pl-12 py-3.5 text-[15px] rounded-xl shadow-sm border-gray-200 focus:ring-4 focus:ring-blue-500/10 transition-all" type="password" inputMode="numeric" placeholder="4–6 digit PIN"
                    value={f.pin} onChange={set("pin")} />
                </div>
              </label>

              {mode === "register" && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <Select label="Age" k="age_slab" opts={AGE} />
                  <Select label="Gender" k="gender" opts={GENDER} />
                  <Select label="Income band" k="income_slab" opts={INCOME} />
                  <Select label="Occupation" k="occupation" opts={OCC} />
                  <label className="block col-span-2">
                    <span className="label text-[13px] font-bold text-[var(--ink)] uppercase tracking-wider mb-1.5">State</span>
                    <select className="field rounded-xl shadow-sm border-gray-200 focus:ring-4 focus:ring-blue-500/10 text-[14px]" value={f.state} onChange={set("state")}>
                      {STATES.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
                    </select>
                    <span className="text-xs font-medium text-[var(--muted)] mt-1.5 block">
                      Unlocks State-specific welfare schemes.
                    </span>
                  </label>
                  <label className="block col-span-2">
                    <span className="label text-[13px] font-bold text-[var(--ink)] uppercase tracking-wider mb-1.5">Exact annual income (₹, optional)</span>
                    <input className="field py-3 rounded-xl shadow-sm border-gray-200 focus:ring-4 focus:ring-blue-500/10 text-[14px]" inputMode="numeric" placeholder="e.g. 120000"
                      value={f.annual_income} onChange={set("annual_income")} />
                    <span className="text-xs font-medium text-[var(--muted)] mt-1.5 block">
                      Giving an exact figure makes your eligibility results more precise.
                    </span>
                  </label>
                </div>
              )}

              <button
                onClick={mode === "login" ? doLogin : doRegister}
                disabled={busy}
                className="btn btn-primary w-full py-3.5 text-[16px] mt-4 shadow-blue-900/10 hover:shadow-blue-900/20">
                {busy && <Loader2 className="animate-spin" size={20} />}
                {mode === "login" ? "Login to your account" : "Register & continue"}
              </button>

              <p className="text-[12px] font-medium text-[var(--muted)] text-center pt-3 px-4 leading-relaxed">
                By continuing you agree to Haqq processing your data with consent under the DPDP Act, 2023.
              </p>
            </div>
          </div>
        </div>
      </main>
      <GovFooter />
    </div>
  );
}
