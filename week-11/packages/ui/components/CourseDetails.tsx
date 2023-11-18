"use client";

import Image, { StaticImageData } from 'next/image';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import courseImage from "./course.png";
import { courseDetails } from 'store';
import Navbar from '../layouts/Navbar';
import axios from 'axios';

interface ObjectProp {
  title: String;
  description: String;
  price: String;
  imageLink: StaticImageData;
  author: String;
}

interface CourseObj {
  title: String | null;
  description: String | null;
  image: String | null;
  price: Number | null;
  published: boolean;
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
  const [role, setRole] = useState(false);
  const [showUpdateComp, setUpdateComp] = useState(false);

  const router = useRouter();

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

  const getRole = async () => {
    const res = await fetch('/api/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    setRole(data.role);
  }


  // CourseUpdate Logic
  const updatehandler = async () => {
    setUpdateComp(true);
  }

  const [updateCourse, setUpdateCourse] = React.useState<CourseObj>({
    title: 'title',
    description: "description",
    image: "imageLink",
    price: 32,
    published: false
  });
  const [status, setStatus] = useState("");


  
  const updateCourseHandler = async (e) => {
    e.preventDefault();
    console.log('courseUpdate : ', updateCourse);
    try {
        await axios
            .put(
                `/api/courseupdate/${courseId}`,
                {
                    title: updateCourse.title,
                    description: updateCourse.description,
                    price: updateCourse.price,
                    imageLink: updateCourse.image,
                    published: updateCourse.published,
                    // purchasedCourses: []
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then((e) => {
                console.log(e);
              setStatus(course.title + " updated succesfully !");
              router.push('/courses');
            })
            .catch((err) => {
                console.log(err);
                setStatus("Please Login before accessing this page !");
            });
    } catch (e) {
        console.log(e);
        setStatus("this course is not found in database !");
    }
};


  useEffect(() => {
    getCourse();
    getRole();
  }, []);

  return (
    <main className='relative'>
      <nav className="px-5 py-3 flex justify-between items-center">
        <h1 onClick={() => router.push('/courses')} className="font-bold cursor-pointer text-[1.3rem] xl:text-[1.7rem]">Coursera</h1>
      </nav>
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
          {
            role ? (
              <button onClick={updatehandler} className='mt-3 w-full p-1 rounded-md bg-red-500'>Update Course</button>
            ) : (
              <button className='mt-3 w-full p-1 rounded-md bg-red-500'>Purchase Course</button>
            )
          }
        </div>
      </div>
      {/* courseUpdate */}
      {!showUpdateComp ? null : (
        <div className="flex bg-gray-900 border-b border-gray-800 flex-col py-4">
          <div className="font-semibold text-[1.2rem] text-gray-300">
            Update Course :
          </div>
          <div className="py-5 px-20 flex flex-col space-y-2">
            {status && (
              <p className="text-red-600 font-semibold text-[0.9rem] text-center">
                {status}
              </p>
            )}
            <input
              type={"text"}
              className="outline-none px-2 py-2 rounded-md text-gray-800 sm:w-[400px]"
              placeholder="title"
              // value={course.name}
              onChange={(e) => {
                e.preventDefault()
                setUpdateCourse({ ...updateCourse, title: e.target.value })
              }}
            />
            <input
              type={"text"}
              className="outline-none px-2 py-2 rounded-md text-gray-800 sm:w-[400px]"
              placeholder="imageLink"
              // value={course.desc}
              onChange={(e) => {
                e.preventDefault()
                setUpdateCourse({ ...updateCourse, image: e.target.value })
              }}
            />
            {/* <input
                            type={"text"}
                            className="outline-none px-2 py-2 rounded-md text-gray-800 sm:w-[400px]"
                            placeholder="description"
                            // value={course.desc}
                            onChange={(e) => {
                                e.preventDefault()
                                setCourse({ ...course, description: e.target.value })
                            }}
                        /> */}
            <input
              type={"text"}
              className="outline-none px-2 py-2 rounded-md text-gray-800 sm:w-[400px]"
              placeholder="description"
              // value={course.desc}
              onChange={(e) => {
                e.preventDefault()
                setUpdateCourse({ ...updateCourse, description: e.target.value })
              }}
            />
            <input
              type={"text"}
              className="outline-none px-2 py-2 rounded-md text-gray-800 sm:w-[400px]"
              placeholder="author"
              // value={course.author}
              onChange={(e) => {
                e.preventDefault()
                setUpdateCourse({ ...updateCourse, price: Number(e.target.value) })
              }}
            />
            <div className="pt-10">
              <button
                className="px-3 py-1 hover:bg-green-400 bg-green-600 rounded-md"
                onClick={(e) => updateCourseHandler(e)}
              >
                Update Course
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default CourseDetails