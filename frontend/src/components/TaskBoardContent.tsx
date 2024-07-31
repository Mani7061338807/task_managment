"use client";
import React, { useEffect } from "react";
import LeftModule from "./LeftModule";
import RightModule from "./RightModule";
import { getUserTasks } from "@/helpers/api-communicator";
import { Task } from "@/interface/task";
import { setTasks } from "@/redux/reducer/task";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

const TaskBoardContent = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  const getTasks = async () => {
    const res: any = await getUserTasks();
    const tasks: Task[] = res.data;
    dispatch(setTasks(tasks));
  };
  const redirectToLogin = () => {
    router.push("/login");
  };
  useEffect(() => {
    if (user.email === "") {
      redirectToLogin();
    }
    getTasks();
  }, []);
  return (
    <div>
      {user.email && (
        <div className="w-full flex gap-2">
          <LeftModule />
          <RightModule />
        </div>
      )}
    </div>
  );
};

export default TaskBoardContent;
