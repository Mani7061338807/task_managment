
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { updateTaskStatus } from "@/redux/reducer/task";
import TaskColumn from "./TaskColumn";
import { updateTaskStatusToDb } from "@/helpers/api-communicator";
import opinion from "@/assets/undraw_opinion_re.png";
import share_link_img from "@/assets/undraw_share_link_re.png";
import undraw from "@/assets/undraw_undraw_posts.png";
import {
  AutomationIcon,
  CalanderIcon,
  FilterIcon,
  ShareIcon,
  TaskIcon,
} from "@/common/svg/IconPack";
import TaskModal from "./TaskModal";
import Image from "next/image";

const RightModule = () => {
  const { categorizedTasks } = useAppSelector((state) => state.task);
  const [isModal,setModal] = useState(false);
  const onToggleModal = () => {
    setModal(!isModal);
  }
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const columns = ["To do", "In progress", "Under review", "Completed"];
  const handleDropTask = async (taskId: string, newStatus: string) => {
    await updateTaskStatusToDb(taskId, newStatus);
    dispatch(updateTaskStatus({ taskId, newStatus }));
  };

  return (
    <div className="w-[90%] max-h-[100vh] overflow-y-auto bg-[#F7F7F7]">
      <div className="flex px-4 py-4 justify-between">
        <div className="font-bold text-[24px]">Good Morning, {user.name}!</div>
        <div className="flex gap-1 items-center">
          Help & feedback
          <div className="w-[18px] h-[18px] border border-[#000000] rounded-full flex justify-center items-center text-black text-[15px]">
            ?
          </div>
        </div>
      </div>
      <div className="flex gap-2 px-4">
        <div className="flex gap-2 rounded-md py-1 items-center bg-[#FFFFFF]">
          <Image
            src={opinion.src}
            width={76}
            height={50}
            alt=""
            className="w-[76px] h-[50px]"
          />
          <div className="flex flex-col">
            <div className="text-[16px] font-semibold text-[#757575]">
              Introducing tags
            </div>
            <div className="text-[#868686] text-[14px]">
              Easily categorize and find your notes by adding tags. Keep your
              workspace clutter-free and efficient.
            </div>
          </div>
        </div>
        <div className="flex gap-2 py-1 rounded-md items-center bg-[#FFFFFF]">
          <Image
            src={share_link_img.src}
            alt=""
            width={76}
            height={50}
            className="w-[76px] h-[50px]"
          ></Image>
          <div className="flex flex-col">
            <div className="text-[16px] font-semibold text-[#757575]">
              Share Notes Instantly
            </div>
            <div className="text-[#868686] text-[14px]">
              Effortlessly share your notes with others via email or link.
              Enhance collaboration with quick sharing options.
            </div>
          </div>
        </div>
        <div className="flex gap-2 py-1 rounded-md items-center bg-[#FFFFFF]">
          <Image
            src={undraw.src}
            alt=""
            width={76}
            height={50}
            className="w-[76px] h-[50px]"
          />
          <div className="flex flex-col">
            <div className="text-[16px] font-semibold text-[#757575]">
              Access Anywhere
            </div>
            <div className="text-[#868686] text-[14px]">
              Sync your notes across all devices. Stay productive whether you
              are on your phone, tablet, or computer.
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-4 justify-between px-4">
        <div className="">
          <input
            type="text"
            placeholder="Search"
            className="focus:outline-none w-[] px-2 py-2 brorder border-[black] rounded-lg bg-white"
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-2">
            Calander <CalanderIcon />
          </div>
          <div className="flex gap-2">
            Automation <AutomationIcon />
          </div>
          <div className="flex gap-2">
            Filter <FilterIcon />
          </div>
          <div className="flex gap-2">
            Share <ShareIcon />
          </div>
          <div
            className="text-white px-2 py-2 flex items-center justify-center gap-2 cursor-pointer  rounded-lg"
            style={{
              background: "linear-gradient(180deg, #4C38C2 0%, #2F2188 100%)",
            }}
            onClick={onToggleModal}
          >
            Create new{" "}
            <button className="w-[20px] flex justify-center items-center h-[20px] text-[22px] bg-white rounded-full text-black">
              +
            </button>
          </div>
        </div>
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className="w-[90%] bg-[#F7F7F7] p-4">
          <div className="flex gap-4">
            {columns.map((column) => (
              <div key={column} className="w-1/4 p-2 bg-[#F7F7F7] rounded-md">
                <div className="flex justify-between mb-4">
                  {column} <TaskIcon />
                </div>
                <TaskColumn
                  category={column}
                  tasks={categorizedTasks[column] || []}
                  onDropTask={handleDropTask}
                />
              </div>
            ))}
          </div>
        </div>
      </DndProvider>
      <TaskModal isModalOpen={isModal} onToggleModal={onToggleModal} />
    </div>
  );
};

export default RightModule;
