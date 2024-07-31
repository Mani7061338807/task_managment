"use client"
import TaskBoardContent from "@/components/TaskBoardContent";
import { checkAuthStatus } from "@/helpers/api-communicator";
import { userAction } from "@/redux/action/user";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const getUser = async () => {
    const res = await checkAuthStatus();
    dispatch(userAction(res.name, res.email));
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <TaskBoardContent />
    </div>
  );
}
