import { useState } from "react";

const fakeTopDrinks = [
  { name: "Margarita", rating: 4.8 },
  { name: "Old Fashioned", rating: 4.7 },
  { name: "Negroni", rating: 4.6 },
];

const fakeDrinkOfTheDay = {
  name: "Espresso Martini",
  description: "A rich and smooth coffee-infused cocktail.",
  image: "https://www.thecocktaildb.com/images/media/drink/lyloe91487602877.jpg"
};

export default function Home() {
  return (
    <main className="flex-1 p-8">
      {/* this will be a logo instead of plain text */}
      <h1 className="text-7xl font-bold text-gray-900 text-center mb-8">
        SPIRITLABS
      </h1>

      <div className="grid grid-cols-2 gap-8 text-center">
        <div>
          <Section title="TOP DRINKS">
            {fakeTopDrinks.map((drink, idx) => (
              <DrinkCard key={idx} name={drink.name} rating={drink.rating} />
            ))}
          </Section>
          <div className="mt-8 text-center">
            <Section title="Surprise Me?">
              <img
                src="/icon-dark.svg"
                alt="logo-image"
                className="mx-auto w-50"
              />
            </Section>
          </div>
        </div>

        <Section title="Drink Of The Day" className="h-full text-center">
          <DrinkCard
            name={fakeDrinkOfTheDay.name}
            description={fakeDrinkOfTheDay.description}
          />
          <img
            src={fakeDrinkOfTheDay.image}
            alt="drink-of-the-day"
            className="mx-auto w-4/5"
          />
        </Section>
      </div>
    </main>
  );
}

// This will become a separate component
const Section = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

// This will become a separate component
const DrinkCard = ({ name, rating, description }) => (
  <div className="bg-gray-100 p-4 rounded-xl shadow">
    <h3 className="text-xl font-medium">{name}</h3>
    {rating && <p className="text-gray-600">⭐ {rating}</p>}
    {description && <p className="text-gray-600">{description}</p>}
  </div>
);
