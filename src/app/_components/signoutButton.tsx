import { signOut } from "~/server/auth"

export const SignOutButton = () => {
    return (
        <button onClick={async () => {
            "use server"
            await signOut();
        }}>Sign out</button>
    )
}