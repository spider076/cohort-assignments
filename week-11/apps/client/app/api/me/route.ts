import { Admin } from "db";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "ui";

export async function GET(req: NextRequest) {
    // const body = await req.json();
    // const admin = await Admin.findOne({ username: body.username });
    // if (!admin) {
    //     return NextResponse.json({ msg: "Admin doesnt exist" }, { status: 403 });
    // }
    let cookie = req.cookies.get("token")?.value;
    let data = getDataFromToken(NextRequest);
    alert('hi ; '+ data);
    const response = NextResponse.json({
        // username: admin.username,
        token: cookie,
        role: 'user'
    });
    return response;
}