import { auth, signIn } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { SignOutButton } from "../../_components/signoutButton";

export default async function ProfilePage() {
    const user = await auth();
    if (!user) {
        return await signIn();
    }
    return (
        <HydrateClient>
            <main className="flex flex-col items-center min-h-screen text-white bg-gradient-to-b from-[#070169] to-[#15162c]">
                <div className="mt-[10%] flex flex-row">
                        <img src={user.user.image!} alt="user pfp" className="w-32 rounded-full" />
                        <div className="my-auto ml-8">
                                <h2>Username: {user.user.name}</h2>
                                <h2>Email: {user.user.email}</h2>
                                <SignOutButton />
                        </div>
                </div>
            </main>
        </HydrateClient>
    );
}