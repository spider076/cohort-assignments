import { Course } from "db";
import { NextResponse } from "next/server";
import { dbConnect } from "../../lib/dbConnect";

export async function POST(req: Request) {
    await dbConnect();

    const body = await req.json();
    console.log('body :', body);
    try {
        const course = await new Course(body);
        await course.save();
        return NextResponse.json({ message: "Course Created Succesfully !" , courseId: course.id});
    } catch (e) {
        console.log('error : ', e);
        return NextResponse.json({ message: "Error while Creating Course !" });
    }
    
}

export async function GET() {
    const courses = await Course.find({});
    return NextResponse.json({ courses });
}