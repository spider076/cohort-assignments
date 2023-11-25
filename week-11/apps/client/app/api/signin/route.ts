import { User } from "db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { dbConnect } from "../../lib/dbConnect";

const SECRET = 'secret';


export async function POST(req: Request) {
    await dbConnect();

    const body = await req.json();
    const username = body.username;
    console.log('body : ', body);
    try {
        const userFound = await User.findOne({ username: body.username, password: body.password });

        console.log('userFound : ', userFound);

        if (userFound) {
            const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
            const response = NextResponse.json({ message: "You Logged in Succesfully !", token: token, status: 200 });
            response.cookies.set('token', token, { expires: new Date(Date.now() + 60 * 60 * 1000) });
            return response;
        } else {
            return NextResponse.json({ message: 'Invalid User username or password .', status: 403 }, { status: 403 })
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: 'error while signining in !', status: 401 }, { status: 401 });
    }

}