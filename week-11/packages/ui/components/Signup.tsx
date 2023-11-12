"use client";

import { useState } from "react";
import { Input } from "../@/components/ui/input";
import { Button } from "../@/components/ui/button";
import BackButton from "../@/components/BackButton";
import { z } from "zod";
// import { Label } from "@/components/ui/label";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupInputs = z.object({
    username: z.string().email(),
    password: z.string().min(4),
  });

  const signupHandler = async () => {
    // const zodAuth = signupInputs.safeParse({ email, password }); // zod authentication in frontend
    // console.log('zodAuth : ', { email, password });

    // if (!zodAuth.success) {
    //   alert("invalid username or password");
    //   return;
    // }

    const response = fetch(`api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    let data = (await response).json();
    console.log("data : ", data);
    // localStorage.setItem("token", data);
    // window.location = "/"
    // setUser({ userEmail: email, isLoading: false });
    // router.push("/courses");
  };

  return (
    <main className="bg-[#f31f1f] h-[100vh]">
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
          Welcome to Coursera. Sign up below
        </h1>
      </div>
      <div className="pt-7 inherit flex flex-col items-center gap-0">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="email">Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <br />
        <br />

        <Button
          //   size={"large"}
          className="bg-blue-400 px-8 text-white hover:text-black"
          variant="secondary"
          onClick={signupHandler}
        >
          {" "}
          Signup
        </Button>
      </div>
    </main>
  );
};

export default Signup;
