import { Admin, User } from "db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "../../lib/dbConnect";

const SECRET = "secret";


export async function POST(req: Request,) {
    await dbConnect();

    const { username, password } = await req.json();

    console.log('user name : ', username);
    console.log('password : ', password);

    const user = await User.findOne({ username });
    if (user) {
        return NextResponse.json({ message: 'User already exists', status: 400 }, { status: 400 });
    } else {
        const obj = { username: username, password: password };
        const newUser = new User(obj);
        newUser.save();

        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        return NextResponse.json({ message: 'User created successfully !', token , status: 200 });
    }
}

// export const GET = async (req: Request) => {
//     return NextResponse.json({ message: "User logged in !" });
// }