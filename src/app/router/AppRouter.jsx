import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../../components/common/Loader";
import { ROUTES } from "./constants";

// PUBLIC PAGES
const Home = lazy(() => import("../../pages/public/Home"));
const About = lazy(() => import("../../pages/public/About"));
const Lore = lazy(() => import("../../pages/public/Lore"));
const Features = lazy(() => import("../../pages/public/Features"));
const HowToPlay = lazy(() => import("../../pages/public/HowToPlay"));
const Rules = lazy(() => import("../../pages/public/Rules"));
const Socials = lazy(() => import("../../pages/public/Socials"));
const Contact = lazy(() => import("../../pages/public/Contact"));
const Faq = lazy(() => import("../../pages/public/Faq"));
const Support = lazy(() => import("../../pages/public/Support"));
// CONDITION PAGES
const Legal = lazy(() => import("../../pages/public/Conditions/Legal"));
const Terms = lazy(() => import("../../pages/public/Conditions/Terms"));
const Privacy = lazy(() => import("../../pages/public/Conditions/Privacy"));
// AUTH PAGES
const Login = lazy(() => import("../../pages/public/Auth/Login"));
const Register = lazy(() => import("../../pages/public/Auth/Register"));
const Logout = lazy(() => import("../../pages/public/Auth/Logout"));
// APP PAGES
const Profile = lazy(() => import("../../pages/player/Profile"));
// ADMIN PAGES
const Dashboard = lazy(() => import("../../pages/admin/Dashboard"));
// ERROR PAGES
const NotFound = lazy(() => import("../../pages/public/Error/NotFound"));

function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />

        <Route path={ROUTES.LORE} element={<Lore />} />
        <Route path={ROUTES.FEATURES} element={<Features />} />

        <Route path={ROUTES.HOWTOPLAY} element={<HowToPlay />} />
        <Route path={ROUTES.RULES} element={<Rules />} />

        <Route path={ROUTES.SOCIALS} element={<Socials />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.FAQ} element={<Faq />} />
        <Route path={ROUTES.SUPPORT} element={<Support />} />

        <Route path={ROUTES.LEGAL} element={<Legal />} />
        <Route path={ROUTES.TERMS} element={<Terms />} />
        <Route path={ROUTES.PRIVACY} element={<Privacy />} />

        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.LOGOUT} element={<Logout />} />

        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
