import { DeleteIcon, EditIcon, TimerIcon } from "@/common/svg/IconPack";
import { DeleteTask, getTask } from "@/helpers/api-communicator";
import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { toast } from "react-toastify";
import TaskModal from "./TaskModal";
import { useAppDispatch } from "@/redux/hook";
import { deleteTask } from "@/redux/reducer/task";

const TaskCard = ({ task, index }) => {
  const dispatch = useAppDispatch();
  const [isModal, setModal] = useState(false);
  const [task_, setTask_] = useState<any>();
  const onToggleModal = () => {
    setModal(!isModal);
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { taskId: task._id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const getBg = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-[#FF6B6B]";
      case "Low":
        return "bg-[#0ECC5A]";
      case "Medium":
        return "bg-[#FFA235]";
      default:
        return "bg-[#0ECC5A]";
    }
  };
  const handleDelete = async (taskId: string) => {
    const result: any = await DeleteTask(taskId);
    if (result.status === 200) {
      toast.success(result.data.message);
      dispatch(deleteTask(taskId));
    } else {
      toast.error("something went wrong please try again");
    }
  };
  const handleEditTask = async (taskId: string) => {
      try {
        const result:any = await getTask(taskId);
        if (result.data && result.data.length > 0) {
          setTask_(result.data[0]);
          onToggleModal();
        }
      } catch (error) {
        console.error("Failed to fetch task:", error);
      }
  };
  return (
    <li
      ref={drag}
      className={`mb-4 p-4 relative border rounded-md bg-[#F9F9F9] ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <strong className="my-1">{task.title}</strong>
      <div className="my-2">{task.description}</div>
      <button className={`rounded-md px-2 my-2 py-1 ${getBg(task.priority)}`}>
        {task.priority}
      </button>
      <div className="my-2 flex gap-2">
        <TimerIcon /> {new Date(task.deadline).toLocaleDateString()}
      </div>
      <p>
        {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
      </p>
      <div className="flex flex-col gap-3 absolute right-2 bottom-4">
        <div
          className="cursor-pointer"
          onClick={() => handleEditTask(task._id)}
        >
          <EditIcon />
        </div>
        <div className="cursor-pointer" onClick={() => handleDelete(task._id)}>
          <DeleteIcon />
        </div>
      </div>
      <TaskModal
        isModalOpen={isModal}
        onToggleModal={onToggleModal}
        type="UPDATE"
        task={task_}
      />
    </li>
  );
};

export default TaskCard;
