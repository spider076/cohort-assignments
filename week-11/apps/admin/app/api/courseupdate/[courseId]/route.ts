import { Course } from "db";
import { NextResponse } from "next/server";


export const PUT = async (req: Request, route: { params: { courseId: string } }) => {
    const body = await req.json();
    const courseId = String(route.params.courseId);
    console.log('body : ', body);
    console.log('courseid : ', courseId);
    const course = await Course.findByIdAndUpdate(courseId, body, { new: true });
    if (course) {
        return NextResponse.json({ message: 'Course Updated Succesfully !' });
    } else {
        return NextResponse.json({ message: "Course Not Found !" });
    }
}