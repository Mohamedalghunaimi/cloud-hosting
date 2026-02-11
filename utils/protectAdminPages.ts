import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyForPages } from "./generateToken";

export const protectAdminPage = async() => {
    const token = (await cookies()).get("token")?.value ;
    if(!token) {
        return redirect("/")
    }
    const user = await verifyForPages(token as string);
    if(!user) {
        return redirect("/")
    } else {
        if(!user.isAdmin) {
            return redirect("/")
        }
    }
}