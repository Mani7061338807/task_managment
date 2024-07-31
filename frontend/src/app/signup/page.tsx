"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userSignup } from "@/helpers/api-communicator";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hook";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };
  const handleSignup = async () => {
    try {
      const res = await userSignup(name, email, password);
      if (res.status === 201) {
        toast.success(res.data.message);
        handleLoginRedirect();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (user.email) {
      router.push("/taskboard");
    }
  });
  return (
    <div
      className="flex justify-center items-center h-[100vh]"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #AFA3FF 100%)",
      }}
    >
      <div
        className="border flex flex-col gap-4 items-center justify-center border-[#CECECE] w-[648px] h-[476px] rounded-[16px]"
        style={{
          background: "linear-gradient(180deg, #F7F7F7 0%, #F0F0F0 100%)",
        }}
      >
        <div className="font-semibold text-[48px]">
          Welcome to <span className="text-[#4534AC]">Workflo!</span>
        </div>
        <div className="flex flex-col gap-4 w-[80%] mx-auto">
          <input
            type="text"
            placeholder="Full name"
            className="border rounded-[8px] bg-[#EBEBEB] p-4 focus:outline-none"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border rounded-[8px] bg-[#EBEBEB] p-4 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your password"
            className="border rounded-[8px] bg-[#EBEBEB] p-4 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="text-center py-2 mt-4 rounded-[8px] text-white"
            style={{
              background: [
                "linear-gradient(180deg, #4C38C2 0%, #2F2188 100%)",
                "linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))",
              ].join(","),
            }}
            onClick={() => handleSignup()}
          >
            Signup
          </button>
        </div>
        <div className="font-normal">
          Already have an account?
          <span
            className="text-[#0054A1] font-normal pl-2 cursor-pointer"
            onClick={handleLoginRedirect}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
