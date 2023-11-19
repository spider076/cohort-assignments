"use client";

import React from 'react'
import Signin from 'ui/components/Signin';

const page = () => {
    return (
        <main>
            <Signin onClick={async (username, password) => {
                const res = await fetch('/api/signin', {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
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
        </main>
    )
}

export default page