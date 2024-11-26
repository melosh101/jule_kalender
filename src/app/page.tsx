import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { formatDate, getDaysUntilChristmas } from "~/lib/utils";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { CalendarCard } from "./calenderCard";

export default async function Home() {
  const daysUntilChristmas = getDaysUntilChristmas()
  const today = new Date()
  console.log('date', daysUntilChristmas)
  return (
    <HydrateClient>
      <main className="min-h-screen  bg-gradient-to-b from-[#070169] to-[#15162c] text-white">
        <div className="container mx-auto px-4 py-8 ">
          <h1 className="text-4xl font-bold text-center text-green-800 dark:text-green-200 mb-4">Christmas Advent Calendar</h1>
          <p className="text-center text-xl mb-8">
            Today is {formatDate(today)}. {daysUntilChristmas} days until Christmas!
          </p>
          <div className="grid grid-cols-2 container sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 24 }, (_, i) => {
              return (<CalendarCard key={i} day={i} imageUrl="/favicon.ico" message="hello world"></CalendarCard>)
            })
            }
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
