import { PublicLayout } from "../../../layouts/PublicLayout";

function NotFound() {
  return (
    <PublicLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-700">
          The page you are looking for does not exist.
        </p>
      </div>
    </PublicLayout>
  );
}

export default NotFound;
