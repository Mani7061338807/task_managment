import React, { useState } from "react";
import TaskModal from "./TaskModal";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { AnalyticsIcon, ArrowIcon, BoardIcon, HomeIcon, NotificationIcon, SettingsIcon, StarIcon, TeamMemberIcon } from "@/common/svg/IconPack";
import { userAction } from "@/redux/action/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LeftModule = () => {
  const [isModal, setModal] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const onToggleModal = () => {
    setModal(!isModal);
  };
  const onLogout = () => {
    localStorage.removeItem("token");
    dispatch(userAction('', ''));
    toast.success("Logut Success");
    router.push('/');
  }
  return (
    <div className="w-[280px] h-[100vh] border p-4 border-[#DEDEDE] flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="w-[31px] h-[31px] border flex justify-center items-center border-[#DEDEDE] rounded-full">
          {user.name.charAt(0).toUpperCase() || "S"}
        </div>
        <div>{user.name || "sonal"}</div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <NotificationIcon />
          <StarIcon />
          <ArrowIcon />
        </div>
        <div
          className="bg-[#f9f9f9] cursor-pointer px-2 py-1 rounded-md"
          onClick={onLogout}
        >
          Logout
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="pl-2 flex gap-2 border cursor-pointer border-[#DEDEDE] bg-[#F4F4F4]">
          <HomeIcon /> Home
        </div>
        <div className="pl-2 flex gap-2  cursor-pointer hover:bg-[#F4F4F4] ">
          <BoardIcon /> Board
        </div>
        <div className="pl-2 flex gap-2 cursor-pointer hover:bg-[#F4F4F4]">
          {" "}
          <SettingsIcon /> Settings
        </div>
        <div className="pl-2 flex gap-2 cursor-pointer hover:bg-[#F4F4F4]">
          {" "}
          <TeamMemberIcon /> Teams
        </div>
        <div className="pl-2 flex gap-2 cursor-pointer hover:bg-[#F4F4F4]">
          <AnalyticsIcon /> Analytics
        </div>
      </div>
      <div
        className="text-white py-2 flex items-center justify-center gap-2 cursor-pointer  rounded-lg"
        style={{
          background: "linear-gradient(180deg, #4C38C2 0%, #2F2188 100%)",
        }}
        onClick={onToggleModal}
      >
        Create new task{" "}
        <button className="w-[20px] flex justify-center items-center h-[20px] text-[22px] bg-white rounded-full text-black">
          +
        </button>
      </div>
      <TaskModal isModalOpen={isModal} onToggleModal={onToggleModal} />
    </div>
  );
};

export default LeftModule;
