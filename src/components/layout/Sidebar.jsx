import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../app/router/constants";

const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = {
  home:       "M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9",
  characters: "M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z",
  journal:    "M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 014 17V5a2 2 0 012-2h14v15H6.5",
  inventory:  "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0",
  skills:     "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  world:      "M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20",
  factions:   "M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5zm-5 6c-.83 0-1.5.67-1.5 1.5v2c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-2c0-.83-.67-1.5-1.5-1.5zM9.5 10H11V7H9.5C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4H11V2H9.5A3.5 3.5 0 006 5.5 3.5 3.5 0 009.5 9H11v1H9.5C7.57 10 6 11.57 6 13.5S7.57 17 9.5 17H11v2H9.5C7.01 19 5 17 5 14.5M13 19v-9",
  settings:   "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  logout:     "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
};

const NAV = [
  {
    section: "Aventure",
    items: [
      { label: "Tableau de bord", path: ROUTES.PROFILE,    icon: "home" },
      { label: "Personnages",     path: ROUTES.CHARACTERS, icon: "characters" },
      { label: "Journal",         path: ROUTES.JOURNAL,    icon: "journal" },
    ],
  },
  {
    section: "Équipement",
    items: [
      { label: "Inventaire",  path: ROUTES.INVENTORY, icon: "inventory" },
      { label: "Compétences", path: ROUTES.SKILLS,    icon: "skills" },
    ],
  },
  {
    section: "Monde",
    items: [
      { label: "Carte",     path: ROUTES.WORLD,    icon: "world" },
      { label: "Factions",  path: ROUTES.FACTIONS, icon: "factions" },
    ],
  },
];

function SidebarLink({ item }) {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 group
        ${isActive
          ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
          : "text-slate-400 hover:text-slate-100 hover:bg-slate-700/60 border border-transparent"
        }`
      }
    >
      <span className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
        <Icon d={ICONS[item.icon]} />
      </span>
      <span className="truncate">{item.label}</span>
    </NavLink>
  );
}

export function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <>
      {/* Backdrop mobile */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-30 flex flex-col w-64 bg-slate-800 border-r border-slate-700
          transition-transform duration-200 ease-in-out
          lg:static lg:translate-x-0 lg:z-auto
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-700">
          <div className="w-7 h-7 rounded-md bg-amber-500 flex items-center justify-center">
            <span className="text-slate-900 font-bold text-xs">SR</span>
          </div>
          <span className="font-bold text-slate-100 tracking-wide">SariwonRP</span>
        </div>

        {/* User card */}
        <div className="px-4 py-3 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-600 flex items-center justify-center text-slate-300 font-semibold text-sm shrink-0">
              {user?.username?.[0]?.toUpperCase() ?? "?"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-slate-100 truncate">
                {user?.username ?? "Joueur"}
              </p>
              <p className="text-xs text-slate-400">Aventurier</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {NAV.map((group) => (
            <div key={group.section}>
              <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                {group.section}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <SidebarLink key={item.path} item={item} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Bas de sidebar */}
        <div className="px-3 py-3 border-t border-slate-700 space-y-1">
          <SidebarLink item={{ label: "Paramètres", path: ROUTES.SETTINGS, icon: "settings" }} />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent transition-all duration-150"
          >
            <Icon d={ICONS.logout} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
}
