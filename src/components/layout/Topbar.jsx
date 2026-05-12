import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../app/router/constants";

const MenuIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <line x1="3" y1="6"  x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const BellIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

export function Topbar({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="h-14 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-4 shrink-0">
      {/* Bouton hamburger (mobile) */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition"
        aria-label="Ouvrir le menu"
      >
        <MenuIcon />
      </button>

      {/* Fil d'ariane / titre de la page — laissé libre pour les pages */}
      <div className="flex-1" />

      {/* Droite */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition">
          <BellIcon />
          {/* Badge */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full" />
        </button>

        {/* Avatar + nom */}
        <Link
          to={ROUTES.PROFILE}
          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-700 transition group"
        >
          <div className="w-7 h-7 rounded-full bg-slate-600 flex items-center justify-center text-slate-300 font-semibold text-xs shrink-0 group-hover:ring-1 group-hover:ring-amber-500/50 transition">
            {user?.username?.[0]?.toUpperCase() ?? "?"}
          </div>
          <span className="hidden sm:block text-sm text-slate-300 group-hover:text-slate-100 transition max-w-28 truncate">
            {user?.username ?? "Joueur"}
          </span>
        </Link>
      </div>
    </header>
  );
}
