"use client";

import { useState } from "react";
import { Input } from "../@/components/ui/input";
import { Button } from "../@/components/ui/button";
import BackButton from "../@/components/BackButton";
import { useRouter } from "next/navigation";
// import { z } from "zod";
// import { Label } from "@/components/ui/label";

const Signup = ({ onClick }: {
  onClick: (username: String, password: String) => any;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState<{ message: String, status: Number, token: any }>({
    message: "",
    status: 404,
    token: null
  });
  const router = useRouter();

  // const signupInputs = z.object({
  //   username: z.string().email(),
  //   password: z.string().min(4),
  // });

  // const signupHandler = async () => {
  //   // const zodAuth = signupInputs.safeParse({ email, password }); // zod authentication in frontend
  //   // console.log('zodAuth : ', { email, password });

  //   // if (!zodAuth.success) {
  //   //   alert("invalid username or password");
  //   //   return;
  //   // }

  //   const response = fetch(`api/signup`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: email,
  //       password: password,
  //     }),
  //   });
  //   let data = (await response).json();
  //   console.log("data : ", data);
 
  // };

  
  const clickHandler = async () => {
    const r = await onClick(email, password);
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
    <main className="bg-[rgb(29,29,29)] h-[100vh]">
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

        <p className="pb-5 text-orange-600 font-semibold text-[1.1rem]">{response.message}</p>

        <Button
          //   size={"large"}
          className="bg-blue-600 px-8 text-white hover:text-black"
          variant="secondary"
          onClick={clickHandler}
        >
          {" "}
          Signup
        </Button>
      </div>
    </main>
  );
};

export default Signup;
