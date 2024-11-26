import Link from "next/link";
import { auth } from "~/server/auth"

export const Navbar = async () => {

    const user = await auth();
    return (
        <>
            <div><Link href={"/"}>Calender</Link></div>
        </>
    )
}