import {Request} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import bcrypt from 'bcrypt';
import {NextResponse} from "next/server";
import prisma from "../../libs/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const {email, name, password} = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    // @ts-ignore
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    });

    return NextResponse.json(user);
}