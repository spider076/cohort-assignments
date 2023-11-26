"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

const AuthButtons = () => {
  const router = useRouter();
  const [user, setUser] = useState<String | null>("");


  const get = async () => {
    try {
      const res = await axios.get('/api/me');
      const  username  = res.data.username;
      setUser(username);      
    } catch (e) {
      setUser(null);
    }
    
  };

  const logout = async () => {
    const res = await axios.get('/api/logout');
    alert(res.data.message);
    location.reload();
  }

  useEffect(() => {
    get();
  }, []);

  console.log('user : ', user);
  return (
    <div className="space-x-2">
      {user == null ? (
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
        <div className="flex gap-3">
          <p>{user}</p>
          <Button
            onClick={logout}
            className="bg-red-300 px-7 text-white rounded-lg"
            variant={"destructive"}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
