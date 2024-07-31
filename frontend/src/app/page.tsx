"use client";
import { checkAuthStatus } from "@/helpers/api-communicator";
import { userAction } from "@/redux/action/user";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const getUser = async () => {
    const res = await checkAuthStatus();
    dispatch(userAction(res.name, res.email));
  };
  const handleLogin = () => {
    router.push("/login");
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      className="flex justify-center flex-col gap-6 items-center h-[100vh]"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #AFA3FF 100%)",
      }}
    >
      <div className="bg-white px-32 rounded-[5px] py-2 body-1">
        Welcome to the Crework 😊.
      </div>
      <div
        className="px-4 rounded-md cursor-pointer py-2 bg-[#5263ff] text-white"
        onClick={() => handleLogin()}
      >
        Login
      </div>
    </div>
  );
}
