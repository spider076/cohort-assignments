"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

const AuthButtons = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);


  const get = async () => {
    const res = await axios.get('/api/me');
    const token = res.data.token;
    console.log('token : ', token);
    if (token && token != undefined) {
      setShow(true);
    }
  };

  useEffect(() => {
    get();
  }, []);



  return (
    <div className="space-x-2">
      {!show ? (
        <>
          <Button
            onClick={() => {
              router.push("/signup");
            }}
            className="bg-blue-300 hover:text-white text-black px-7 rounded-lg"
          >
            Sign Up
          </Button>
          <Button
            onClick={() => {
              router.push("/signin");
            }}
            className="bg-red-300 px-7 text-white rounded-lg"
            variant={"destructive"}
          >
            Sign In
          </Button>
        </>
      ) : (
        "hello there"
      )}
    </div>
  );
};

export default AuthButtons;
