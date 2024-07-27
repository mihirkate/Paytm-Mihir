"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const token = Math.random().toString(); // Ofcourse this part in future will be
    //  comming from the banking servers
    // it would be like axiox.get("https://hdfcbank.com/netbanking")

    const userId = session.user.id;
    if (!userId) {
        return {
            msg: "User Not logged in "
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount: amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token
        }
    })
    return {
        msg: "on ramp Transaction added "
    }
}