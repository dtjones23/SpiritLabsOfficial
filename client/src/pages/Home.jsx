import { useState } from "react";
import RandomButton from "../components/features/RandomButton";
import TopDrinks from "../components/features/TopDrinks";
import DOTD from "../components/features/DOTD";

export default function Home() {
  return (
    <main className="flex-1 p-8">
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
    </main>
  );
}
