import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      &copy; 2026 SariwonRP. All rights reserved.
    </footer>
  );
}

export function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-3">SariwonRP</h3>
          <p className="text-sm leading-6 text-gray-400">
            Plongez dans un univers roleplay immersif, façonnez votre histoire
            et rejoignez une communauté vivante.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Découvrir</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                À propos
              </Link>
            </li>
            <li>
              <Link to="/lore" className="hover:text-white transition-colors">
                Univers
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="hover:text-white transition-colors"
              >
                Fonctionnalités
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Commencer</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/app/register"
                className="hover:text-white transition-colors"
              >
                S’inscrire
              </Link>
            </li>
            <li>
              <Link
                to="/app/login"
                className="hover:text-white transition-colors"
              >
                Se connecter
              </Link>
            </li>
            <li>
              <Link
                to="/how-to-play"
                className="hover:text-white transition-colors"
              >
                Comment jouer
              </Link>
            </li>
            <li>
              <Link to="/rules" className="hover:text-white transition-colors">
                Règlement
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Communauté</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/socials"
                className="hover:text-white transition-colors"
              >
                Réseaux
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="hover:text-white transition-colors"
              >
                Support
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>&copy; 2026 SariwonRP. Tous droits réservés.</p>

        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-white transition-colors">
            Confidentialité
          </Link>
          <Link to="/terms" className="hover:text-white transition-colors">
            Conditions
          </Link>
          <Link to="/legal" className="hover:text-white transition-colors">
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
