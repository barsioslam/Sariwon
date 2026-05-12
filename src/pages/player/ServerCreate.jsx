import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerLayout } from "../../layouts/PlayerLayout";
import { ROUTES } from "../../app/router/constants";

const GENRES = [
  { id: "fantasy",    label: "Fantasy",          icon: "⚔️" },
  { id: "scifi",      label: "Science-fiction",   icon: "🚀" },
  { id: "horreur",    label: "Horreur",           icon: "🕯️" },
  { id: "historique", label: "Historique",        icon: "🏰" },
  { id: "moderne",    label: "Contemporain",      icon: "🌆" },
  { id: "autre",      label: "Autre",             icon: "✨" },
];

const STEPS = ["Général", "Paramètres", "Récapitulatif"];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEPS.map((label, i) => {
        const done    = i < current;
        const active  = i === current;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className={`
              w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors
              ${done   ? "bg-amber-500 text-slate-900"                                      : ""}
              ${active ? "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/50"          : ""}
              ${!done && !active ? "bg-slate-700 text-slate-500"                            : ""}
            `}>
              {done ? <CheckIcon /> : i + 1}
            </div>
            <span className={`text-sm hidden sm:block ${active ? "text-slate-100 font-medium" : "text-slate-500"}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-px mx-1 ${done ? "bg-amber-500/50" : "bg-slate-700"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, hint, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">{label}</label>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      {children}
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}

const inputCls = `w-full bg-slate-900 border border-slate-600 focus:border-amber-500 rounded-lg px-3 py-2.5
  text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors`;

export default function ServerCreate() {
  const navigate = useNavigate();
  const [step, setStep]   = useState(0);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name:        "",
    description: "",
    genre:       "",
    visibility:  "public",
    maxPlayers:  8,
    inviteCode:  "",
    ageRestricted: false,
  });

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  /* ── Validation par étape ── */
  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.name.trim())        e.name  = "Le nom est requis.";
      else if (form.name.length < 3) e.name = "Minimum 3 caractères.";
      if (!form.genre)              e.genre = "Choisis un genre.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => s + 1); };
  const back = () => setStep((s) => s - 1);

  const handleSubmit = () => {
    /* TODO: appel API POST /servers */
    console.log("Créer serveur", form);
    navigate(ROUTES.PROFILE);
  };

  return (
    <PlayerLayout>
      <div className="max-w-2xl mx-auto">
        {/* En-tête */}
        <div className="mb-6">
          <button
            onClick={() => navigate(ROUTES.PROFILE)}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-4"
          >
            <ArrowLeftIcon /> Retour
          </button>
          <h1 className="text-2xl font-bold text-slate-100">Créer un RP</h1>
          <p className="text-sm text-slate-500 mt-1">Configure ta campagne et invite tes joueurs.</p>
        </div>

        <StepIndicator current={step} />

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-6">

          {/* ── Étape 0 : Général ── */}
          {step === 0 && (
            <>
              <Field label="Nom du RP" error={errors.name}>
                <input
                  className={inputCls}
                  placeholder="ex: Les Chroniques d'Aelthar"
                  value={form.name}
                  maxLength={60}
                  onChange={(e) => set("name", e.target.value)}
                />
                <div className="text-right text-[11px] text-slate-600 mt-1">{form.name.length}/60</div>
              </Field>

              <Field label="Description" hint="Présente l'univers et l'ambiance de ton RP.">
                <textarea
                  className={`${inputCls} resize-none h-28`}
                  placeholder="Un monde déchiré par la guerre, où les anciens dieux reviennent…"
                  value={form.description}
                  maxLength={400}
                  onChange={(e) => set("description", e.target.value)}
                />
                <div className="text-right text-[11px] text-slate-600 mt-1">{form.description.length}/400</div>
              </Field>

              <Field label="Genre" error={errors.genre}>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {GENRES.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => set("genre", g.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-all
                        ${form.genre === g.id
                          ? "border-amber-500/60 bg-amber-500/10 text-amber-300"
                          : "border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300"
                        }`}
                    >
                      <span>{g.icon}</span>
                      <span className="truncate">{g.label}</span>
                    </button>
                  ))}
                </div>
              </Field>
            </>
          )}

          {/* ── Étape 1 : Paramètres ── */}
          {step === 1 && (
            <>
              <Field label="Visibilité">
                <div className="grid grid-cols-2 gap-3 mt-1">
                  {[
                    { value: "public",  label: "Public",  desc: "Visible dans la liste des serveurs" },
                    { value: "private", label: "Privé",   desc: "Accessible uniquement par invitation" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => set("visibility", opt.value)}
                      className={`text-left p-3.5 rounded-xl border transition-all
                        ${form.visibility === opt.value
                          ? "border-amber-500/60 bg-amber-500/10"
                          : "border-slate-600 hover:border-slate-500"
                        }`}
                    >
                      <p className={`text-sm font-semibold ${form.visibility === opt.value ? "text-amber-300" : "text-slate-300"}`}>
                        {opt.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Nombre maximum de joueurs">
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={2} max={30} step={1}
                    value={form.maxPlayers}
                    onChange={(e) => set("maxPlayers", Number(e.target.value))}
                    className="flex-1 accent-amber-500"
                  />
                  <span className="w-10 text-center text-lg font-bold text-amber-400">
                    {form.maxPlayers}
                  </span>
                </div>
              </Field>

              <Field
                label="Code d'invitation personnalisé"
                hint="Laisse vide pour en générer un automatiquement."
              >
                <input
                  className={inputCls}
                  placeholder="ex: MON-RP-42"
                  value={form.inviteCode}
                  maxLength={16}
                  onChange={(e) => set("inviteCode", e.target.value.toUpperCase())}
                />
              </Field>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-700">
                <div>
                  <p className="text-sm font-medium text-slate-300">Contenu adulte (+18)</p>
                  <p className="text-xs text-slate-500 mt-0.5">Restreint l'accès aux joueurs ayant validé leur âge.</p>
                </div>
                <button
                  type="button"
                  onClick={() => set("ageRestricted", !form.ageRestricted)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${form.ageRestricted ? "bg-amber-500" : "bg-slate-600"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.ageRestricted ? "translate-x-5" : ""}`} />
                </button>
              </div>
            </>
          )}

          {/* ── Étape 2 : Récapitulatif ── */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Récapitulatif</h2>
              <div className="space-y-3 text-sm">
                <Row label="Nom"         value={form.name} />
                <Row label="Genre"       value={GENRES.find((g) => g.id === form.genre)?.label ?? "—"} />
                <Row label="Description" value={form.description || <span className="text-slate-600 italic">Aucune</span>} />
                <Row label="Visibilité"  value={form.visibility === "public" ? "Public" : "Privé"} />
                <Row label="Max joueurs" value={form.maxPlayers} />
                <Row label="Code d'invitation" value={form.inviteCode || <span className="text-slate-500 italic">Généré automatiquement</span>} />
                <Row label="+18"         value={form.ageRestricted ? "Oui" : "Non"} />
              </div>

              <div className="pt-2 text-xs text-slate-600">
                Tu pourras modifier ces paramètres plus tard depuis les réglages du serveur.
              </div>
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="flex justify-between pt-2 border-t border-slate-700">
            <button
              onClick={back}
              disabled={step === 0}
              className="px-4 py-2 rounded-lg border border-slate-600 text-sm text-slate-400 hover:text-slate-200 hover:border-slate-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Précédent
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={next}
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm font-semibold transition-colors"
              >
                Suivant
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm font-semibold transition-colors"
              >
                Créer le RP
              </button>
            )}
          </div>
        </div>
      </div>
    </PlayerLayout>
  );
}

const Row = ({ label, value }) => (
  <div className="flex gap-4 items-start py-2 border-b border-slate-700/50 last:border-0">
    <span className="w-36 shrink-0 text-slate-500">{label}</span>
    <span className="text-slate-200 flex-1">{value}</span>
  </div>
);

const CheckIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const ArrowLeftIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
