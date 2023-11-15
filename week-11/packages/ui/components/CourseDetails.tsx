"use client";

import Image, { StaticImageData } from 'next/image';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import courseImage from "./course.png";
import { courseDetails } from 'store';
import Navbar from '../layouts/Navbar';

interface ObjectProp {
  title: String;
  description: String;
  price: String;
  imageLink: StaticImageData;
  author: String;
}


const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<ObjectProp>({
    title: 'title',
    description: 'description',
    imageLink: courseImage,
    price: "price",
    author: "author"
  });

  const getCourse = async () => {
    const response = await fetch(`/api/course/${courseId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json();
    setCourse(data.course);
  }

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <main className='relative'>
      <Navbar />
      <div className="pt-10 w-full h-full flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h2 className="text-2xl font-bold mb-5">Course ID: {courseId}</h2>
          <p className="text-gray-700 mb-2">Title: {course.title}</p>
          <p className="text-gray-700 mb-2">Description: {course.description}</p>
          <Image className="w-full  object-contain object-center mb-5"
            src={courseImage} height={100} width={300}
            alt={String(course.title)} />
          <p className="text-gray-700 mb-2">Price: {course.price}</p>
          <p className="text-gray-700">Author: {course.author}</p>
          <button className='mt-3 w-full p-1 rounded-md bg-red-500'>Purchase Course</button>
        </div>
      </div>
    </main>
  )
}

export default CourseDetails