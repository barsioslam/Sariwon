import { Footer } from "../components/common/Footer";

export function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">SariwonRP - Admin</h1>
      </header>
      <main className="flex-grow p-4">{children}</main>
      <Footer />
    </div>
  );
}
