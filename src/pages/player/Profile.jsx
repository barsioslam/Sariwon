import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerLayout } from "../../layouts/PlayerLayout";
import { useAuth } from "../../hooks/useAuth";

/* ── Données fictives — à remplacer par appels API ── */
const MOCK_SERVERS = [
  {
    id: 1,
    name: "Les Chroniques d'Aelthar",
    description: "Un monde médiéval-fantastique en guerre contre les ombres.",
    role: "MJ",
    playerCount: 6,
    maxPlayers: 8,
    character: null,
    lastActivity: "Il y a 2h",
    banner: null,
  },
  {
    id: 2,
    name: "Espace Lointain IX",
    description: "Science-fiction, exploration spatiale et diplomatie interstellaire.",
    role: "Joueur",
    playerCount: 4,
    maxPlayers: 6,
    character: "Kael Dronos",
    lastActivity: "Il y a 3 jours",
    banner: null,
  },
];

/* ── Composants ── */

function RoleBadge({ role }) {
  return role === "MJ" ? (
    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
      MJ
    </span>
  ) : (
    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
      Joueur
    </span>
  );
}

function ServerCard({ server, onClick }) {
  const fill = Math.round((server.playerCount / server.maxPlayers) * 100);

  return (
    <button
      onClick={() => onClick(server)}
      className="text-left w-full group bg-slate-800 border border-slate-700 hover:border-amber-500/50 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/5"
    >
      {/* Banner / placeholder */}
      <div className="h-20 bg-gradient-to-br from-slate-700 to-slate-800 relative flex items-end px-4 pb-3">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="relative flex items-center justify-between w-full">
          <h3 className="font-bold text-slate-100 text-sm group-hover:text-amber-300 transition-colors line-clamp-1">
            {server.name}
          </h3>
          <RoleBadge role={server.role} />
        </div>
      </div>

      <div className="p-4 space-y-3">
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {server.description}
        </p>

        {server.character && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
            <span className="truncate">Personnage : <span className="text-slate-300">{server.character}</span></span>
          </div>
        )}
        {!server.character && server.role === "Joueur" && (
          <div className="flex items-center gap-2 text-xs text-amber-500/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            <span>Aucun personnage créé</span>
          </div>
        )}

        {/* Joueurs + dernière activité */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <div className="flex-1 w-24 h-1 rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-500/60 transition-all"
                style={{ width: `${fill}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-500">
              {server.playerCount}/{server.maxPlayers}
            </span>
          </div>
          <span className="text-[11px] text-slate-600">{server.lastActivity}</span>
        </div>
      </div>
    </button>
  );
}

function JoinModal({ open, onClose }) {
  const [code, setCode] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-lg font-bold text-slate-100 mb-1">Rejoindre un RP</h2>
        <p className="text-sm text-slate-500 mb-6">Entre un code d'invitation ou parcours les serveurs publics.</p>

        <div className="space-y-4">
          {/* Code */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Code d'invitation
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="ex: AELTH-42X"
                maxLength={12}
                className="flex-1 bg-slate-900 border border-slate-600 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
              />
              <button
                disabled={!code.trim()}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 text-sm font-semibold transition-colors"
              >
                Rejoindre
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-600 text-xs">
            <div className="flex-1 h-px bg-slate-700" />
            ou
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          {/* Liste publique */}
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-600 hover:border-slate-500 text-sm text-slate-300 hover:text-slate-100 transition-colors">
            <GlobeIcon />
            Parcourir les serveurs publics
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
          aria-label="Fermer"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

/* ── Page principale ── */

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [joinOpen, setJoinOpen] = useState(false);

  const handleEnterServer = (server) => {
    navigate(`/app/servers/${server.id}`);
  };

  return (
    <PlayerLayout>
      <JoinModal open={joinOpen} onClose={() => setJoinOpen(false)} />

      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">
            Bonjour,{" "}
            <span className="text-amber-400">{user?.username ?? "Aventurier"}</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {MOCK_SERVERS.length > 0
              ? `Tu participes à ${MOCK_SERVERS.length} aventure${MOCK_SERVERS.length > 1 ? "s" : ""}.`
              : "Tu ne participes encore à aucune aventure."}
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setJoinOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-500 text-sm text-slate-300 hover:text-slate-100 transition-colors"
          >
            <PlusIcon />
            Rejoindre
          </button>
          <button
            onClick={() => navigate("/app/servers/create")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm font-semibold transition-colors"
          >
            <PlusIcon />
            Créer un RP
          </button>
        </div>
      </div>

      {/* Liste des RPs */}
      {MOCK_SERVERS.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {MOCK_SERVERS.map((server) => (
            <ServerCard key={server.id} server={server} onClick={handleEnterServer} />
          ))}
        </div>
      ) : (
        <EmptyState onJoin={() => setJoinOpen(true)} onCreate={() => navigate("/app/servers/create")} />
      )}
    </PlayerLayout>
  );
}

function EmptyState({ onJoin, onCreate }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-4">
      <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 text-slate-600">
        <CompassIcon />
      </div>
      <h2 className="text-lg font-bold text-slate-300 mb-1">Aucune aventure en cours</h2>
      <p className="text-sm text-slate-500 max-w-xs mb-6">
        Crée ton propre RP ou rejoins celui d'un autre joueur pour commencer.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onJoin}
          className="px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-500 text-sm text-slate-300 hover:text-slate-100 transition-colors"
        >
          Rejoindre un RP
        </button>
        <button
          onClick={onCreate}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm font-semibold transition-colors"
        >
          Créer un RP
        </button>
      </div>
    </div>
  );
}

/* ── Icônes ── */
const PlusIcon = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const GlobeIcon = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);
const CloseIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const CompassIcon = () => (
  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
  </svg>
);
