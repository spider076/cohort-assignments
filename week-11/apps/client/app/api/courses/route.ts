import { Course } from "db";
import { NextResponse } from "next/server";

export async function GET() {
    const courses = await Course.find({});
    return NextResponse.json({ courses });
}