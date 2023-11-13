import { Admin } from "db";
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

    const admin = await Admin.findOne({ username });
    if (admin) {
        return NextResponse.json({ message: 'Admin already exists' }, { status: 400 });
    } else {
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        newAdmin.save();

        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        return NextResponse.json({ message: 'Admin created successfully', token });
    }
}

export const GET = async (req: Request) => {
    return NextResponse.json({ message: "logged in !" });
}