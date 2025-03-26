import { useState } from "react";
import { useGlobalContext } from "../GlobalProvider";
import AuthModal from "../components/AuthModal";
import RandomButton from "../components/features/RandomButton";
import TopDrinks from "../components/features/TopDrinks";
import DOTD from "../components/features/DOTD";

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const { loggedIn, username, userId } = useGlobalContext();

  return (
    <main className="flex-1 p-1 h-full">
      {!loggedIn ? (
        <div className="flex justify-center mb-4">
          <button 
            onClick={() => setAuthOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold cursor-pointer"
          >
            Log In / Sign Up
          </button>
        </div>
      ) : (
        <div className="flex justify-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Welcome {username && (
              <span className="text-yellow-500 mx-2 text-3xl">
                {username}
              </span>
            )} to 
          </h2>
        </div>
      )}

      <h1 className="text-7xl font-bold text-gray-900 text-center mb-8">
        SPIRITLABS
      </h1>

      <div className="grid grid-cols-2 gap-8 text-center">
        <div>
          <TopDrinks />
          <RandomButton />
        </div>
        <DOTD />
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </main>
  );
}