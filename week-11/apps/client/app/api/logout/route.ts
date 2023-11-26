import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    console.log('sdfsfdsdf');
    try {
        const response = await NextResponse.json({
            message : "successfully logged out !",
        });
        response.cookies.set("token", "");
        console.log(response);
        return response;
    } catch (error: any) {
        throw new Error(error);
    } 
}