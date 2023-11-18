"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import Signin from 'ui/components/Signin';

const page = () => {

  const router = useRouter();

  return (
    <main>
      <Signin onClick={async (username, password) => {
        const response = await fetch(`api/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        let data = await response.json();
        console.log('data :', data);
        return data;
      }}
      />
    </main>
  )
}

export default page