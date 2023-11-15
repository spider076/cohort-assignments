"use client";

import Image, { StaticImageData } from 'next/image';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import courseImage from '../../../public/course.png';
import CourseDetails from 'ui/components/CourseDetails';

interface ObjectProp {
  title: String;
  description: String;
  price: String;
  imageLink: StaticImageData;
  author: String;
}


const page = () => {
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
    <main>
      <CourseDetails />
    </main>
  )
}

export default page