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
    router.push('/login')
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      hello world <div className="cursor-pointer" onClick={handleLogin}>login</div>
    </div>
  );
}
