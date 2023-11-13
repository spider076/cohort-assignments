"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import Signin from 'ui/components/Signin';

const page = () => {

  const router = useRouter();

  return (
    <main>
      <Signin onClick={async (username, password) => {
        const response = fetch(`api/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        let data = (await response).json();
        router.push('/courses');
        console.log("data : ", data);
      }}
      />
    </main>
  )
}

export default page