import { Navbar } from "~/app/_components/ui/navbar"
import { HydrateClient } from "~/trpc/server"
import { CustomEditor } from "./editor"

type props = {
  params: Promise<{id: string}>
}

export default async function ChallengePage({params}: props) {
  const id = (await params).id
  return (
    <HydrateClient>
      <Navbar/>
      <main className="grid grid-cols-[300px_minmax(900px,_1fr)_100px]">
        <div className="bg-slate-700">
          <h1>{id} Title</h1>
          <p>{id} Description</p>
          <hr/>
        </div>
        <CustomEditor/>
      </main>
    </HydrateClient>
  )
}