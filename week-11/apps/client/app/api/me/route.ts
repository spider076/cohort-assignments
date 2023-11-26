import { Admin } from "db";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "ui/components/getDataFromToken";
// import { getDataFromToken } from "ui";

export async function GET(req: NextRequest) {
    try {
        const data = await getDataFromToken(req);
        const response = NextResponse.json(data);
        return response;
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}