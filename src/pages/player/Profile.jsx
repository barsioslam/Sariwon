import { PlayerLayout } from "../../layouts/PlayerLayout";

function Profile() {
  return (
    <PlayerLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Player Profile</h2>
        <p className="text-lg text-gray-700">
          View and manage your player profile information.
        </p>
      </div>
    </PlayerLayout>
  );
}

export default Profile;
