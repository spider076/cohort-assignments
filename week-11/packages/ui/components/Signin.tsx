"use client";

import BackButton from "../@/components/BackButton";
import { Button } from "../@/components/ui/button";
import { Input } from "../@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Prop {
  onClick: (username: String, password: String) => any;
}

const SignIn = ({ onClick }: Prop) => {
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [response, setResponse] = useState<{ message: String, status: Number, token: any }>({
    message: "",
    status: 404,
    token: null
  });

  const router = useRouter();


  const clickHandler = async () => {
    const r = await onClick(username, password);
    // @ts-ignore
    setResponse(r);

    if (r.status !== 200) {
      alert('Invalid Username or Password');
    } else {
      localStorage.setItem("token", r.token);
      router.push('/courses');
    }
    // router.push('/courses');
    console.log("data : ", r);
  }




  return (
    <main className="bg-[#191919] h-[100vh]">
      <BackButton />
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1 className="w-[420px] xl:w-[500px] text-center font-bold xl:text-[2.6rem] text-[2.3rem]">
          Welcome to Coursera. Sign In below
        </h1>
      </div>
      <div className="pt-7 inherit flex flex-col items-center gap-0">
        <div
          className="xl:w-[500px] flex flex-col items-center w-full 
       sm:w-[600px]"
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="email">Email</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <br />
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="password">Password</label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="password"
            />
          </div>
          <div className="ml-28 self-start text-gray-300">
            <p className="mt-4 self-start">
              Not Register ?
              <span
                // FormAction={() => {

                // }}
                className="cursor-pointer text-[1.2rem] text-blue-500 ml-2"
              >
                Sign Up
              </span>
            </p>
          </div>
          <br></br>
        </div>

        <p className="pb-5 text-orange-600 font-semibold text-[1.1rem]">{response.message}</p>

        <Button
          //   size={"large"}
          className="bg-blue-400 px-8 text-white hover:text-black"
          variant="secondary"
          onClick={clickHandler}
        >
          {" "}
          Signin
        </Button>
      </div>
    </main>
  );
};

export default SignIn;
