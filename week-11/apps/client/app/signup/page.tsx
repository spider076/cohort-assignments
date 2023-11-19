"use client";

import React from 'react'
import Signup from 'ui/components/Signup';

const page = () => {
  return (
    <Signup onClick={async (username, password) => {
      const res = await fetch('api/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username, 
          password
        })
      })

      const response = await res.json();
      console.log('response : ', response);
      return response;
    }} />
  )
}

export default page