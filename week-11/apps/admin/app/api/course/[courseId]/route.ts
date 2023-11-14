import { Course } from "db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, route: {params: {courseId: string}}) {
    const courseId  = String(route.params.courseId);
    const course = await Course.findById(courseId);
    return NextResponse.json({ course });
}