import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PublicLayout } from "../../../layouts/PublicLayout";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../app/router/constants";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || ROUTES.PROFILE;

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">
              Connexion
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Bienvenue sur SariwonRP
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Adresse e-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="vous@exemple.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 text-white text-sm font-semibold rounded-lg transition cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? "Connexion en cours…" : "Se connecter"}
              </button>
            </form>

            <p className="text-sm text-center text-gray-500 mt-6">
              Pas encore de compte ?{" "}
              <Link
                to={ROUTES.REGISTER}
                className="text-gray-800 font-semibold hover:underline"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export default Login;
