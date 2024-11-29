import { Navbar } from "~/app/_components/ui/navbar"
import { api} from "~/trpc/server"
import { CustomEditor } from "./editor"
import { signIn } from "next-auth/react"
import { auth } from "~/server/auth"


type props = {
  params: Promise<{ id: string }>
}

export default async function ChallengePage({ params }: props) {
  const session = await auth();
  if (!session) {
    return signIn();
  }


  const id = (await params).id
  const challenge = await api.challenges.getChallengeWithSubmissions({ id: parseInt(id) })

  if (!challenge) {
    return <div>Challenge not found</div>
  }

  return (
    <>
      <Navbar />
      <main className="grid grid-cols-[300px_minmax(900px,_1fr)_100px] min-h-screen">
        <div className="bg-slate-700 h-full">
          <h1>{id} Title</h1>
          <p>{id} Description</p>
          <hr />
        </div>
        <CustomEditor code={challenge.challenge_submission?.code} />
      </main>
    </>
  )
}