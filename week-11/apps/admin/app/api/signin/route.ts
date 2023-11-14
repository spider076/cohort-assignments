import { Admin } from "db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET = 'secret';

export async function POST(req: Request) {
    const body = await req.json();
    const username = body.username;
    try {
        const adminFound = await Admin.findOne({ username: body.username, password: body.password });

        console.log('adminFound : ', adminFound);

        if (adminFound) {
            const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
            return NextResponse.json({ message: "You Logged in Succesfully !", token: token });
        } else {
            return NextResponse.json({ message: 'Invalid Admin username or password .' }, { status: 403 })
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: 'error while signining in !' }, { status: 401 });
    }

}