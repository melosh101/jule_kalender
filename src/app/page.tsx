import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const date = new Date().getDate();
  const month = new Date().getMonth();

  console.log('date', date, "month", month)
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#070169] to-[#15162c] text-white">
        <a href="/profile"> PROFILE</a>
        {Array.from({ length: 24 }, (_, i) => {
            if(month !== 10 || date < i) {
              return <div key={i}>Item {i + 1} disabled</div>
            } 
            
            
            return <div key={i}>Item {i + 1}</div>
          })
        }
      </main>
    </HydrateClient>
  );
}
