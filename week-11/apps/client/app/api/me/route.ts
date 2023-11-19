import { Admin } from "db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // const body = await req.json();
    // const admin = await Admin.findOne({ username: body.username });
    // if (!admin) {
    //     return NextResponse.json({ msg: "Admin doesnt exist" }, { status: 403 });
    // }
    return NextResponse.json({
        // username: admin.username,
        role: 'user'
    })
}