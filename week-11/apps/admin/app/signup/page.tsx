"use client";

import React from 'react'
import Signup from 'ui/components/Signup'
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  return (
    <div>
      <Signup onClick={async (username, password) => {
        const response = await fetch(`api/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        console.log('res status : ', response.status)
        let data = await response.json();
        console.log("data : ", data);
        alert(String(data.message));

        if (response.status !== 200) {
          return;
        } else {
          router.push('/courses');
        }
      }}
      />
    </div>
  )
}

export default page